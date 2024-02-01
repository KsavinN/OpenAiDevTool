import { resolveTask } from "../utils/resolveTask";



export async function OwnApiTask() {
  await resolveTask('ownapi',() => 'https://aidev2-api-f9ba73dc2ad2.herokuapp.com/');
}
