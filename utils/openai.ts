import axios from 'axios';



const OPENAI_URL = 'https://api.openai.com/v1';
const getAPI_KEY = () => process.env.OPENAI_KEY


export interface Categories {
  hate: boolean
  "hate/threatening": boolean
  "self-harm": boolean
  sexual: boolean
  "sexual/minors": boolean
  violence: boolean
  "violence/graphic": boolean
}

export interface CategoryScores {
  hate: number
  "hate/threatening": number
  "self-harm": number
  sexual: number
  "sexual/minors": number
  violence: number
  "violence/graphic": number
}

type DataModerationResults = {
  id: string,
  model: string,
  results: [
    {
      categories: Categories
      category_scores: CategoryScores
      flagged: boolean
    }
  ]
}


const sendTextForCheck = async (prompt: string) => {
  const response = await axios.post(`${OPENAI_URL}/moderations`, { input: prompt }, {
    headers: {
      Authorization: 'Bearer ' + getAPI_KEY(),
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export type Message = {
  role: 'system' | 'user' | 'assistant',
  content: string,
}

type SendToChatGPTParmas = {
  prompt?: string;
  messages?: Message[],
  model?: string,
  user?: string,
}

export const simpleSendToChatGPT = async ( { prompt, messages: messagesParams, model:_model }: SendToChatGPTParmas ) => {
  const model= _model || 'gpt-3.5-turbo';
  const messages = messagesParams ? messagesParams: [{ role: 'user', content: prompt }]
  const response = await axios.post(`${OPENAI_URL}/chat/completions`, { model, messages }, {
    headers: {
      Authorization: 'Bearer ' + getAPI_KEY(),
      'Content-Type': 'application/json'
    }
  })
  return response.data.choices[0].message
}

export const chatWithGPT = async ( { prompt, messages: messagesParams, model:_model , user }: SendToChatGPTParmas ) => {
  const model= _model || 'gpt-3.5-turbo';
  const messages = messagesParams ? messagesParams: [{ role: 'user', content: prompt }]
  const response = await axios.post(`${OPENAI_URL}/chat/completions`, { model, messages, user }, {
    headers: {
      Authorization: 'Bearer ' + getAPI_KEY(),
      'Content-Type': 'application/json'
    }
  })
  return response.data.choices[0].message
}

export const sendForEmbedding = async (input: string) => {
  const model = 'text-embedding-ada-002'
  try {
    const response = await axios.post(`${OPENAI_URL}/embeddings`, { model, input  }, {
      headers: {
        Authorization: 'Bearer ' + getAPI_KEY(),
        'Content-Type': 'application/json'
      }
    });
    return response.data.data[0].embedding
  } catch (error: any) {
    console.log('error', error)
    console.log('error', error?.response?.data?.error)
  }
}

export const whisperTranscription = async ( formData: any ) => {
  try {
    const response = await axios.post(`${OPENAI_URL}/audio/transcriptions`, formData, {
      headers: {
        Authorization: 'Bearer ' + getAPI_KEY(),
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.text
  } catch (error: any) {
    console.log('error', error)
    console.log('error', error?.response?.data?.error)
  }
}

export const visionGPT = async ({url, text}: {url: string, text: string}) => {
  const messages = [{
    role: 'user',
    content: [
      {type: 'text', text},
      {type: 'image_url', image_url: {url}}
    ]
  }]
  const response = await axios.post(`${OPENAI_URL}/chat/completions`, { model: 'gpt-4-vision-preview', messages }, {
    headers: {
      Authorization: 'Bearer ' + getAPI_KEY(),
      'Content-Type': 'application/json'
    }
  })
  return response.data.choices[0].message
}

const isPromptFlagged = (dataModerationResponse: DataModerationResults) => {
  const { results: [{ flagged }] } = dataModerationResponse;
  return flagged;
} 

export const checkIfPromtIsFlagged = (prompt: string) =>  sendTextForCheck(prompt).then(isPromptFlagged)


