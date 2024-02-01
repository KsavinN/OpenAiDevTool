import { Task } from "..";
import { getTokenAuthorization, getTask, sendAnswer } from "./taskRequest";

export async function resolveTask(taskName: Task,prepareAnswer: (input: any) => any, _token?:string) {
  try {
    const token = _token || await getTokenAuthorization(taskName);
    const taskAnswer = await getTask(token);
    const answer = await prepareAnswer(taskAnswer);
    const result = await sendAnswer(token, answer);
    console.log( { result } )
  } catch (error: any) {
     console.log('Error in resolve task', error?.response?.data ?? { error });
  }
}

