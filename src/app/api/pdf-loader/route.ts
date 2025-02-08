import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import connectDB from "@/lib/db";

// Configuration constants
const CHUNK_SIZE = 100;
const CHUNK_OVERLAP = 20;
const DB_NAME = "ai-agent";
const COLLECTION_NAME = "chunks";

// Save temporary file
async function saveTemporaryFile(file: File): Promise<string> {
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  return filePath;
}

// Process document
async function processDocument(filePath: string) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs.map(doc => doc.pageContent);
}

// Create embeddings
async function createEmbeddings(texts: string[]) {
  const model = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001",
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
  });
  return await model.embedDocuments(texts);
}

// Main function this basically loads the pdf and saves the chunks to the database
export async function POST(req: NextRequest) {
  let filePath: string | null = null;

  try {
    // Connect to database
    await connectDB();

    // Get and validate file
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Process PDF
    filePath = await saveTemporaryFile(file);
    const chunks = await processDocument(filePath);
    const embeddings = await createEmbeddings(chunks);

    // Store in MongoDB
    const client = new MongoClient(process.env.MONGODB_URI || "");
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    const documents = chunks.map((chunk, index) => ({
      agentId: "1",
      text: chunk,
      embedding: embeddings[index],
      metadata: {
        fileName: file.name,
      },
      timestamp: new Date(),
    }));


    await collection.insertMany(documents);

    return NextResponse.json({
      message: "PDF processed successfully",
      documentsProcessed: chunks.length,
    });


  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process the PDF" },
      { status: 500 }
    );
  } finally {
    // Clean up temporary file
    if (filePath) {
      try {
        await unlink(filePath);
      } catch (error) {
        console.error("Error deleting temporary file:", error);
      }
    }
  }
}