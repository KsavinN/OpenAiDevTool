import { upsertVectorDB } from "./data/vectorBase";
import { HelloApiTask, ModerationTask, InpromptTask, BloggerTask, WhisperTask } from "./tasks";
import { EmbeddingTask } from "./tasks/embedding";
import { FunctionsTask } from "./tasks/functions";
import { GnomeTask } from "./tasks/gnome";
import { KnowledgeTask } from "./tasks/knowladge";
import { LiarTask } from "./tasks/liar";
import { MemeTask } from "./tasks/meme";
import { OwnApiTask } from "./tasks/ownapi";
import { PeopleTask } from "./tasks/people";
import { RodoTask } from "./tasks/rodo";
import { ScraperTask } from "./tasks/scraper";
import { SearchTask } from "./tasks/search";
import { ToolsTask } from "./tasks/tools";
import { WhoamiTask } from "./tasks/whoami";
import { readTask } from "./utils/readTask";
import * as dotenv from 'dotenv'


const ActionTask = ['resolve', 'read'] as const;
type ActionTask = typeof ActionTask[number];

const Actions = [...ActionTask, 'updateDB'] as const;
type Actions = ActionTask | 'updateDB';

export const Task = ['helloapi', 'moderation', 'inprompt', 'blogger', 'liar', 'embedding', 'whisper', "functions", "rodo", 'scraper', 'whoami', "search", "people", "knowledge", "tools", "gnome", "ownapi", "meme"] as const;
export type Task = typeof Task[number];


function isAction(input: string | ActionTask): input is ActionTask {
  return Actions.some(action => input === action);
}

function isSupportedTask(input: string | Task): input is Task {
  return Task.some(task => input === task)
}

const mappedTask: Record<Task, () => Promise<void>> = {
  'helloapi': HelloApiTask,
  'moderation': ModerationTask,
  'inprompt': InpromptTask,
  "blogger": BloggerTask,
  "liar": LiarTask,
  "embedding": EmbeddingTask,
  "whisper": WhisperTask,
  "functions": FunctionsTask,
  "rodo": RodoTask,
  "scraper": ScraperTask,
  "whoami": WhoamiTask,
  "search": SearchTask,
  "people": PeopleTask,
  "knowledge": KnowledgeTask,
  "tools": ToolsTask,
  "gnome": GnomeTask,
  "ownapi": OwnApiTask,
  "meme": MemeTask
}

const resolve = async (nameOfTask: Task) => await mappedTask[nameOfTask]()
const read = async (nameOfTask: Task) => await readTask(nameOfTask)


const callAction = async (action: ActionTask | 'updateDB', nameOfTask: Task | string) => {
  if (action === 'updateDB') {
    await upsertVectorDB();
    return;
  }
  if (isSupportedTask(nameOfTask)) {
    switch (action) {
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
    console.error('Wrong task:', nameOfTask);
    console.error('Available tasks:');
    console.error(Task.join('\n'));
  }
}
async function main() {
  const action: string = process.argv[2];
  const taskName: string = process.argv[3];
  if (isAction(action)) {
    await callAction(action, taskName)
  } else {
    console.error('You choose to ', action, 'that is not proper action');
  }
}

dotenv.config()
main();
