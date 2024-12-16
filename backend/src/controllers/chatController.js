// import { ChatService } from '../services/chatService.js';

// export class ChatController {
//   constructor(pineconeIndex) {
//     this.chatService = new ChatService(pineconeIndex);
//   }

//   async handleMessage(req, res) {
//     try {
//       const { message } = req.body;
//       const response = await this.chatService.generateResponse(message);
//       res.json({ response });
//     } catch (error) {
//       console.error('Chat error:', error);
//       res.status(500).json({ error: 'Failed to process message' });
//     }
//   }
// }

const { ChatService } = require("../services/chatService");

class ChatController {
  constructor(pineconeIndex) {
    this.chatService = new ChatService(pineconeIndex);
  }

  async handleMessage(req, res) {
    try {
      const { message } = req.body;
      const response = await this.chatService.generateResponse(message);
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  }
}

module.exports = { ChatController };
