export interface IChunk extends Document {
    agentId: string;
    text: string;
    embedding: number[];
    metadata: {
        source: string;
        page: number;
    };
    timestamp: Date;
  }
  