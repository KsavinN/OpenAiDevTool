import axios from "axios";
import { resolveTask } from "../utils/resolveTask";
import { whisperTranscription } from "../utils/openai";
import FormData from 'form-data';


export async function WhisperTask() {
  const mp3URL = 'https://zadania.aidevs.pl/data/mateusz.mp3'
  const mp3Response =  await axios.get(mp3URL, {responseType: "stream"})
  const formData = new FormData()
  formData.append('file', mp3Response.data)
  formData.append('model', 'whisper-1')
  const text = await whisperTranscription(formData)
  await resolveTask('whisper',() => text)
  }
