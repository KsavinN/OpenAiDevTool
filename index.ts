import { HelloApiTask, ModerationTask, InpromptTask } from "./tasks";
import { readTask } from "./utils/readTask";
import * as dotenv from 'dotenv'


const Action = ['resolve','read'] as const;
type Action = typeof Action[number];

export const Task = ['helloapi','moderation','inprompt'] as const;
export type Task = typeof Task[number];


function isAction(input: string | Action): input is Action {
  return Action.some( action => input === action);
 }

function isSupportedTask(input: string | Task): input is Task {
  return Task.some( task => input === task )
}

const mappedTask: Record<Task,() => Promise<void>> = {
  'helloapi': HelloApiTask,
  'moderation': ModerationTask,
  'inprompt': InpromptTask
}

const resolve = async (nameOfTask: Task) => await mappedTask[nameOfTask]()
const read =  async (nameOfTask: Task) => await readTask(nameOfTask)


const callAction = async (action: Action, nameOfTask: Task | string) => {
  if(isSupportedTask(nameOfTask)) {
    switch(action){
      case 'read': 
        await read(nameOfTask)
        break
      case 'resolve':
        await resolve(nameOfTask)
        break
        default:
          console.warn('Wrong Action in call Action');
      }
  } else {
    console.error('Wrong task', nameOfTask)
  }
}
async function main(){
  const action: string = process.argv[2];
  const taskName: string = process.argv[3];
  if(isAction(action)) {
    await callAction(action, taskName)
  } else {
    console.error('You choose to ', action, 'that is not proper action');
  }
}

dotenv.config()
main();
