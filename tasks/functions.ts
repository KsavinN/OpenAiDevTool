import { resolveTask } from "../utils/resolveTask";



export async function FunctionsTask() {
  const functionDefinition = {
    "description": "Add user",
    "name": "addUser",
    "parameters": {
        "properties": {
            "name": {
                "type": "string"
            },
            "surname": {
                "type": "string"
            },
            "year": {
                "type": "integer"
            }
        },
        "type": "object"
    }
}
  await resolveTask('functions',() => functionDefinition);
}
