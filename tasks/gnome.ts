import { visionGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";



export async function GnomeTask() {
  await resolveTask('gnome', async (input) => {
    const { url } = input;
    const text = `Jakiego koloru jest gnom na obrazku. Jeśli nie jesteś w stanie ustalić koloru lub na obrazku nie ma gnoma wypisz tylko "ERROR"`
    const response = await visionGPT({url, text});
    console.log({response});
    return response.content;
  });
}
