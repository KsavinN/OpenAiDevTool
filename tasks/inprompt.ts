import { Message, simpleSendToChatGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";


export async function InpromptTask() {
    await resolveTask('inprompt', async (taskInput) => {
      const askName = await simpleSendToChatGPT({ prompt: `Return only name from sentence, names are polish: ${taskInput.question}` });
      const name = askName.content.replace('.','');
      const text = taskInput.input.filter( (item:string) => item.includes(name)).join('/')
      const messages: Message[] = [{ role: 'user', content: `Answer question: ${taskInput.question} using {{context}}
      {{context}}
       ${text}
      {{/context}}
      ` },
    ];
      const input = await simpleSendToChatGPT({ messages });
      return input.content;
    });
}