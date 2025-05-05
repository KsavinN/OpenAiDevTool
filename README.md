# Aidev 2

A TypeScript-based project that implements various AI-related tasks and utilities, including integration with OpenAI's API and Pinecone vector database.

## Features

- Multiple AI task implementations including:
  - Hello API
  - Moderation
  - Inprompt
  - Blogger
  - Liar
  - Embedding
  - Whisper (audio transcription)
  - Functions
  - Rodo
  - Scraper
  - Whoami
  - Search
  - People
  - Knowledge
  - Tools
  - Gnome
  - Own API
  - Meme

- Vector database integration with Pinecone
- OpenAI API integration
- Web scraping capabilities
- Audio transcription support

## Prerequisites

- Node.js
- npm or yarn
- TypeScript
- OpenAI API key
- Pinecone API key
- Aidev API key

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
OPENAI_KEY=your_openai_api_key
PINECONE_KEY=your_pinecone_api_key
AIDEV_KEY=your_aidev_api_key
```

## Usage

The project provides several npm scripts for different operations:

```bash
# Start the application
npm start

# Read a specific task
npm run read <task_name>

# Resolve a specific task
npm run resolve <task_name>

# Update the vector database
npm run updateDB
```

## Project Structure

- `tasks/` - Contains implementations of various AI tasks
- `utils/` - Utility functions and helper modules
- `data/` - Data handling and vector database operations
- `index.ts` - Main entry point of the application

## Dependencies

### Main Dependencies
- @pinecone-database/pinecone
- axios
- dotenv
- form-data
- puppeteer
- uuid4

### Development Dependencies
- @types/node
- @types/uuid4
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- nodemon
- ts-node
- typescript

## License

ISC 