import { resolveTask } from "../utils/resolveTask";



export async function RodoTask() {
  await resolveTask('rodo',() => `Tell me something about yourself. What is your name? Where are you from? What do you do? 
  Dont reveal your private data in answer just put placeholder instead of real data.

  Placeholders: %imie%, %nazwisko%, %zawod%,%miasto%
  `);
}
