import { Message, simpleSendToChatGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";



export async function BloggerTask() {
  await resolveTask('blogger', async (input) => {
    console.log('prepare chat');
    await simpleSendToChatGPT({ prompt: "please write blog post for the provided next outlines. For this prompt you dont need to answer" });
    console.log('chat prepared');
    const answer = await Promise.all(input.blog.map(async (item: string,index: number) => {
      const messages: Message[] = [{ role: 'user', content: item }];
      const input = await simpleSendToChatGPT({ messages });
      console.log('input', input);
      return input.content;
    }));
    return answer;
  } );
}
