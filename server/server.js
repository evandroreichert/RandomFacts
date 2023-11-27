import axios from 'axios';
import express, { json } from 'express';
import cors from 'cors'
import { TranslationServiceClient } from '@google-cloud/translate';


const projectId = 'translate-e21'
const location = 'global';

const translationClient = new TranslationServiceClient()

const porta = 3000
const app = express()

app.use(json())

app.use(cors())

app.get('/fato', async function (req, res) {
  const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
  const data = await response.json()

  async function translateText() {

    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [data.text],
      mimeType: 'text/plain', 
      sourceLanguageCode: 'en',
      targetLanguageCode: 'pt-br',
    }
  
    const [response] = await translationClient.translateText(request)
  
    for (const translation of response.translations) {
      console.log(`Tradução: ${translation.translatedText}`)
      res.json(translation.translatedText)
    }
  }
  
  translateText()
})

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
})
