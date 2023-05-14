import axios from 'axios';



const OPENAI_URL = 'https://api.openai.com/v1';
const API_KEY = process.env.OPENAI_KEY


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
      Authorization: 'Bearer ' + API_KEY,
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
  messages?: Message[]
}

export const sendtToChatGPT = async ( { prompt, messages: messagesParams }: SendToChatGPTParmas ) => {
  const model = 'gpt-3.5-turbo';
  const messages = messagesParams ? messagesParams: [{ role: 'user', content: prompt }]
  const response = await axios.post(`${OPENAI_URL}/chat/completions`, { model, messages }, {
    headers: {
      Authorization: 'Bearer ' + API_KEY,
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


