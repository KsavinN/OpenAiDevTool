import { Message, simpleSendToChatGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";
import { getTokenAuthorization, sendQuestion } from "../utils/taskRequest";



export async function LiarTask() {
  const token = await getTokenAuthorization('liar');
  const question = "What is Solar System?";
  const resultFromQuestion = await sendQuestion(token,question);
  const messages: Message[] = [{ role: 'user', content: `Is that answer:${resultFromQuestion} related to this question${question}. Answer only use word YES or NO, nothing else` }
];
  const input = await simpleSendToChatGPT({ messages });
  const formattedInput = input.content.replace('.','').toUpperCase();
  await resolveTask('liar',(input) => formattedInput, token);
}
