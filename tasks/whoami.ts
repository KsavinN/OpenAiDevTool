import { Message, chatWithGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";
import { getTask, getTokenAuthorization } from "../utils/taskRequest";

let conversationHistory: Message[] = [{ role:'user', content:`Będę podawać Ci wsazówki dotyczące osoby, twoim zadaniem jest zgadnąć o kogo chodzi. Jeśli nie jesteś pewien uzyj prostej odpowiedzi NO.`}]

const createNextUserMessage = (content: string) => {
  conversationHistory.push({role: 'user', content});
}

const getWhoamiAnswer = async (firstHint: string) => {
  let tryQuess = 0;

  for(;tryQuess < 6; ++tryQuess) {
    createNextUserMessage(firstHint);
    await chatWithGPT({messages: conversationHistory});
    const answer = await chatWithGPT({messages: conversationHistory});
    if(!answer.content.includes('NO')) {
      console.log('answer', answer.content);
      return answer.content;
    }
    const token = await getTokenAuthorization('whoami');
    const taskInput = await getTask(token);
    createNextUserMessage(taskInput.hint);
    conversationHistory.push(answer);
  }
  console.log('no answer this is converstion history', {conversationHistory});
}

export async function WhoamiTask() {
  await resolveTask('whoami',async (input) => await getWhoamiAnswer(input.hint));
}
