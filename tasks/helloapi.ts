import { resolveTask } from "../utils/resolveTask";



export async function HelloApiTask() {
  await resolveTask('helloapi',(input) => input.cookie);
}
