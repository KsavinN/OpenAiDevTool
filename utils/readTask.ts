import { Task } from "..";
import { getTokenAuthorization, getTask } from "./taskRequest";

export async function readTask(taskName: Task) {
  try {
    const token = await getTokenAuthorization(taskName);
    const answer = await getTask(token);
    console.log('Task description', answer);
    return answer;
  } catch (error) {
     console.error('Error', { error });
  }
}