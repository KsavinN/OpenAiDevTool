import { checkIfPromtIsFlagged } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";


export async function ModerationTask() {
    await resolveTask('moderation', async (answer) => {
      const input = await Promise.all(answer.input.map(async (text: any) => await checkIfPromtIsFlagged(text) ? 1:0))
      return input;
    });
}