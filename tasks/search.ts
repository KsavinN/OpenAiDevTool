import { NAMESPACE as NAMESPACE, initializeVectorDB } from "../data/vectorBase";
import { sendForEmbedding } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";





export const SearchTask = async () => {
  await resolveTask('search',async (input) => {
    const { index } = await initializeVectorDB();
    const question = input.question;
    const embedding = await sendForEmbedding(question);
    const queryResponse = await index.namespace(NAMESPACE).query({
      vector:[...embedding],
      topK: 1,
      includeMetadata:true,
    });
    const [document] = queryResponse.matches
    console.log("SearchTask", {document});
    const url = document.metadata && document.metadata.url;
    return url;
  });
 
}