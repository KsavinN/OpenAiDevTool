import { Message, simpleSendToChatGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";

function getCurrentDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const SYSTEM_PROMPT = `Make a JSON FILE.

###example
Question: Przypomnij mi, abym zapisał się na AI Devs 3.0
AI: {"tool": "ToDo","desc":"zapisz się na AI Devs 3.0"}
Question: Jutro mam spotaknie z Marcinem.
AI: {"tool": "Calendar", "desc": "spotkanie z Marcinem", "date": "2024-01-31"}
Question: Musze zrobic kanapke.
AI: {"tool": "tool","desc":"zrobic kanapke"}
###

#Rules:
- Always use YYYY-MM-DD format for dates
- Always response with valid JSON

###Context
Today is ${getCurrentDate()}
`;

export async function ToolsTask() {
  await resolveTask('tools',async (input) => {
    const question = input.question;
    const messages: Message[] = [{role: "system", content: SYSTEM_PROMPT},{ role: 'user', content: question }];
    const aiCall = await simpleSendToChatGPT({ messages, model: 'gpt-4' });
    console.log('aiCall', { aiCall, question });
    const parse = JSON.parse(aiCall.content);
    return parse;
  });
}
