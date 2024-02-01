import axios from "axios"

const URL = 'https://get.renderform.io/api/v2/render'
const getApiKey =  () => process.env.RENDERFORM_API_KEY


const createImage = async (imageUrl: string, text: string) => {
  const response = await axios.post(URL, {
    "template": "giant-ghouls-step-easily-1380",
      "data": {
        "image": imageUrl,
        "text": text
      }
  }, {
    headers: {
      Authorization: 'Bearer ' + getApiKey(),
      'Content-Type': 'application/json'
    }
  })
  return response.data
}