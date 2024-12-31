# ChatWithPDF

ChatWithPDF is an AI-powered web application that allows users to upload a PDF and interact with its content through a chat interface. This application uses LangChain for natural language processing, Pinecone for vector storage, Cloudinary for PDF file management, and MongoDB to store metadata. The project is built with a React frontend and a Node.js backend.

---

## Features

- **Interactive Chat with PDFs**: Upload a PDF and query its content seamlessly.
- **React Frontend**: User-friendly, responsive, and clean interface.
- **Node.js Backend**: Robust server-side logic for handling requests and processing data.
- **LangChain Integration**: Provides intelligent responses by leveraging advanced natural language processing.
- **Pinecone Vector Database**: Efficient storage and retrieval of document embeddings for fast querying.
- **Cloudinary Storage**: Manages uploaded PDFs with secure storage and retrieval.
- **MongoDB Integration**: Tracks metadata including:
  - Filename
  - Vector ID
  - Creation time
  - Cloudinary URL of the uploaded file
- **Hugging Face API Integration**: Enhances AI processing for accurate and contextual responses.

---

## Project Structure

```
root/
├── frontend/    # React application for the user interface
├── backend/     # Node.js application for server-side logic
├── README.md    # Project documentation
```

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: A running MongoDB instance to store metadata.
- **Pinecone API Key**: Access to a Pinecone account for vector database functionality.
- **Cloudinary Account**: For file storage and management.
- **Hugging Face API Key**: Access to Hugging Face API for AI capabilities.

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_CONNECT=your-mongodb-uri
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX=your-pinecone-index
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
PORT=4000
```

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/chatwithpdf.git
   cd chatwithpdf
   ```

2. **Set Up the Backend**:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Set Up the Frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **Upload a PDF**: Drag and drop or click to upload a PDF file (supports files up to 10MB).
2. **Interact via Chat**: Ask questions about the content of the uploaded PDF, and receive accurate and contextual responses.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Vector Database**: Pinecone
- **AI Processing**: LangChain

---

## Concepts Covered

- **Document Embeddings**: Transforming PDF content into vectorized data for efficient querying.
- **Cloudinary Integration**: Securely storing and retrieving uploaded files.
- **Real-Time Communication**: Bridging frontend and backend for seamless interactions.
- **Metadata Management**: Storing and accessing information about uploaded files using MongoDB.

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with any improvements or new features.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
