import axios from 'axios';

const apiURL = 'https://zadania.aidevs.pl/';
const apiKey = process.env.AIDEV_KEY

function getResponseData(response: any, taskError = '') {
  if (response.status === 200 && response.data.code === 0)
    return response.data
  else throw Error(`error in ${taskError}`);
}

async function getTokenAuthorization(taskName: string) {
  const response = await axios.post(`${apiURL}token/${taskName}`, { "apikey": apiKey });
  const data = getResponseData(response)
  return data.token;
}

async function getTask(token: string) {
  const response = await axios.get(`${apiURL}task/${token}`);
  const data = getResponseData(response);
  return data
}

async function sendAnswer(token: string, answer: any) {
  const response = await axios.post(`${apiURL}answer/${token}`, { answer });
  return response.data;
}

export {
  getTokenAuthorization,
  getTask,
  sendAnswer
}