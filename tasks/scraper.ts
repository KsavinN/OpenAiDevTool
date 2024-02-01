import { resolveTask } from "../utils/resolveTask";
import { Message, simpleSendToChatGPT } from "../utils/openai";
import { getPageContent, stripHtml } from "../utils/browser";



export async function ScraperTask() {
  await resolveTask('scraper', async (input) => {
    const question = input.question;
    const link = input.input
    const html = await getPageContent(link)
    if(!html) return console.log('no html');
    const article = stripHtml(html);
    console.log({question});
    const msg = input.msg;
    const messages: Message[] = [{ role: 'user', content: `Return answer for the question in POLISH language, based on provided article.
    Maximum length for the ANSWER is 200 characters and no MORE.
     ###Question ${question} ###Question ###Article ${article} ###Article`}]
    const answer = await simpleSendToChatGPT({ messages });
    console.log('answer', answer.content)
    return answer.content;
  });
}
