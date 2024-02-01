import axios from "axios";
import { resolveTask } from "../utils/resolveTask";
import { simpleSendToChatGPT } from "../utils/openai";

const DBJSON_URL = 'https://zadania.aidevs.pl/data/people.json';

const getPropertyQuestion = (question: string) => {
  const mapper = {
    ulubiona_postac_z_kapitana_bomby: ['postać','kapitan bomba', 'kapitana bomby'],
    ulubiony_serial: ['serial'],
    ulubiony_film: ['film'],
    ulubiony_aktor: ['aktor', 'aktorka'],
    ulubiony_kolor: ['kolor', 'barwa'],
  }

  const key = Object.entries(mapper).find(([key, values]) => values.some(value => question.includes(value)))?.[0] ?? 'o_mnie';
  return key  as keyof DbJson;
}

type DbJson = {
  imie: string
  nazwisko: string
  o_mnie: string
  ulubiona_postac_z_kapitana_bomby: string
  ulubiony_serial: string
  ulubiony_film: string
  ulubiony_aktor: string
  ulubiony_kolor: string
}

type KeyDbJson = keyof DbJson;

const getAnswerFromDB = (db: DbJson[], fullname: string, key: KeyDbJson) => {
  const [name, surname] = fullname.split(' ');
  const person = db.find(person => person.imie === name && person.nazwisko === surname);
  if(!person){
    return 'brak takiej osoby';
  }
  if(key === 'o_mnie') {
    const split_o_mnie = person.o_mnie.split('.');
    const residence_sentence = split_o_mnie.find(item => item.includes('Mieszkam w'));
    if(!residence_sentence) return 'brak takiej informacji o miejscu zamieszkania';
    const residence = residence_sentence.split(' ')[3];
    return `w ${residence}`;
  }

  return person[key]
}

export async function PeopleTask() {
  const response = await axios.get(DBJSON_URL);
  const db = response.data;
  await resolveTask('people', async (input) => {
    const question = input.question;
    const nameFormattedByAI = await simpleSendToChatGPT({ prompt: `Wyciągnij z podanego  pytania TYLKO i WYŁĄCZNIE imię i nazwisko oraz przekształć je do formy mianownika  ###QUESTION ${question}###Question` });
    const keyProperty = getPropertyQuestion(question);
    const answer = getAnswerFromDB(db, nameFormattedByAI.content, keyProperty);
    console.log({answer, question, nameFormattedByAI});
    return answer;
  });
}
