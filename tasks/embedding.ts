import { sendForEmbedding } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";



export async function EmbeddingTask() {
  const embedding = await sendForEmbedding('Hawaiian pizza');
  console.log({ embedding});
  await resolveTask('embedding',() => embedding);
}
