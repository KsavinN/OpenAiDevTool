import axios from 'axios';

const apiURL = 'https://zadania.aidevs.pl/';

function getResponseData(response: any, taskError = '') {
  if (response.status === 200 && response.data.code === 0)
    return response.data
  else throw Error(`error in ${taskError}`);
}

async function getTokenAuthorization(taskName: string) {
  if(!process.env.AIDEV_KEY) {
    throw Error('No API KEY')
  }
  const response = await axios.post(`${apiURL}token/${taskName}`, { "apikey": process.env.AIDEV_KEY });
  const data = getResponseData(response)
  return data.token;
}

async function getTask(token: string) {
  const response = await axios.get(`${apiURL}task/${token}`);
  const data = getResponseData(response);
  return data
}

async function sendQuestion(token: string, question: string) {
  const response = await axios.post(`${apiURL}task/${token}`, {question}, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
} );
  return response.data.answer;
}

async function sendAnswer(token: string, answer: any) {
  const response = await axios.post(`${apiURL}answer/${token}`, { answer });
  return response.data;
}

export {
  getTokenAuthorization,
  getTask,
  sendAnswer,
  sendQuestion
}