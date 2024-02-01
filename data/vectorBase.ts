import { Pinecone } from '@pinecone-database/pinecone';
import uuid from 'uuid4';
import axios from 'axios';
import { sendForEmbedding } from '../utils/openai';


export const NAMESPACE = 'newsletters';
const ArchiveURL = 'https://unknow.news/archiwum.json';

const getPineconeKey = () => {
  const pineconeKey = process.env.PINECONE_KEY;
  if (!pineconeKey) {
    throw Error('No pinecone key');
  }
  return pineconeKey;
};

const initializeVectorDB = async () => {
  const pinecone = new Pinecone({
    apiKey: getPineconeKey()
  });
  
  const index = pinecone.index('aidev2');
  return {
    pinecone,
    index
  }
}



type ArchiveJson = {
  title: string
  url: string
  info: string
  date: string
}

const upsertVectorDB = async () => {
  const { index } = await initializeVectorDB();
  const startIndex = 402;
  const response = await axios.get(ArchiveURL);
  const archiveFiltered = response.data.slice(startIndex,startIndex+200) as ArchiveJson[];
  const documents = archiveFiltered.map((document: ArchiveJson) => {
    return {
      id: uuid(),
      metadata: {
        info: document.info,
        url: document.url,
        title: document.title,
        date: document.date
      }
    }
  });
  const records = [];
  const wrongEmbeddings = [];
  let i = startIndex;
  for(const document of documents) {
    const embedding = await sendForEmbedding(document.metadata.info);
    if(embedding) {
      records.push({
        id: document.id,
        metadata: document.metadata,
        values: [...embedding]
      });
    } else {
      wrongEmbeddings.push(index);
    }
    console.log("index", i++)
  }
  console.log("wrongEmbeddings", wrongEmbeddings);
  await index.namespace(NAMESPACE).upsert(records);
}


export {
  initializeVectorDB,
  upsertVectorDB
}

