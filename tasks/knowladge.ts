import axios from "axios";
import { Message, simpleSendToChatGPT } from "../utils/openai";
import { resolveTask } from "../utils/resolveTask";

const getCountryPopulation = async (country: string) => {
  const { data } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
  return data[0].population
}

async function getCurrencyExchangeRate(code: string): Promise<number> {
  const { data } = await axios.get(
    `http://api.nbp.pl/api/exchangerates/rates/A/${code}/?format=json`
  );
  return data.rates[0].mid;
}

export async function KnowledgeTask() {

  const SYSTEM_PROMPT = `Classify the question into one of these categories: general | population | currency

  ###example
  Question: What is the population of France?
  AI: { "category": "population", "country": "France"}
  Question: Who wrote the book 'Romeo and Juliet'?
  AI: { "category": "general"}
  Question: What is the EURO exchange rate now?
  AI: { "category": "currency", "code": "eur"}
  ###

  Return it in JSON format in English language.
  `;

  await resolveTask('knowledge', async (input) => {
    const question = input.question;
    const messages: Message[] = [{role: "system", content: SYSTEM_PROMPT},{ role: 'user', content: question }];
    const aiCall = await simpleSendToChatGPT({ messages });

    console.log('aiCall', { aiCall });

    const {category, country, code} = JSON.parse(aiCall.content);

    if(category === 'general') {
      const generalAnswer = await simpleSendToChatGPT({ prompt: question });
      console.log('generalAnswer', { generalAnswer });
      return generalAnswer.content;
    }

    if(category === 'population' && country) {
      const populationAnswer = await getCountryPopulation(country);
      console.log('populationAnswer', { populationAnswer });
      return populationAnswer.content;
    }

    if(category === 'currency' && code) {
      const currencyAnswer = await getCurrencyExchangeRate(code);
      console.log('currencyAnswer', { currencyAnswer });
      return currencyAnswer;
    }
  });
}
