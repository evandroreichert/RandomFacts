import axios from 'axios';
import express, { json } from 'express';
import fetch from 'node-fetch';
const porta = 3000

const app = express();
app.use(json());

let resposta

app.get('/fato', async function (req, res) {
  const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
  const data = await response.json()


  const options = {
    method: 'GET',
    url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
    params: {
      text: data.text,
      to: 'pt',
      from: 'en'
    },
    headers: {
      'X-RapidAPI-Key': 'fd9e4c11edmsh15cef10903a67d6p165353jsn6f778ff04bbd',
      'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    resposta = response.data.translated_text.pt
    console.log(resposta);
    res.send(resposta); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao traduzir a mensagem'); 
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
