import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ObjectId } from "mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import mongoose from "mongoose";
import ChatModel from "@/models/chat";

const DB_NAME = "ai-agent";
const COLLECTION_NAME = "chunks";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { query, agentId } = await req.json();

    // Initialize embeddings model
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    // Get MongoDB client and collection
    const mongoClient = mongoose.connection.getClient();
    const collection = mongoClient.db(DB_NAME).collection(COLLECTION_NAME);

    // Create vector store
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection,
      indexName: `vector_index_${agentId}`,
      textKey: "text",
      embeddingKey: "embedding",
    });

    // Perform similarity search with filter in searchArgs
    const searchResults = await vectorStore.similaritySearch(query, 10, {
      preFilter: {
        agentId: new ObjectId(agentId),
      },
    });

    // Format results to match your schema
    const formattedResults = searchResults.map((result) => result.pageContent);

    const prompt = `Your are a helpful assistant for giving resume answers to the question asked to you .\nYou are asked the following question: ${query}
    \nYou are given the following context: ${formattedResults.join("\n")}
    \nAnswer the question based on the context. And rememeber to give the answer in a way that is easy to understand. And only give the answer nothings else.`;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const chat = {
      botId: agentId,
      userMessage: query,
      botResponse: result?.response?.candidates?.[0]?.content?.parts?.[0]?.text,
    };

    const newChat = new ChatModel(chat);
    await newChat.save();

    return NextResponse.json({
      query: query,
      searchResults: searchResults,
      answer: result?.response?.candidates?.[0]?.content?.parts?.[0]?.text,
    });
  } catch (error) {
    console.error("Vector search error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
