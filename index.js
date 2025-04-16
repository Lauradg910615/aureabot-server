const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const promptAurea = `Eres AureaBot, un asistente cálido y experto en atención para Aurea Skincare...

Nombre: AureaBot; Descripción: Asistente cálido y experto en atención para Aurea Skincare.; Instrucciones: Este GPT es un asistente virtual...
[📌 Aquí pega TODO tu prompt completo que me diste antes]
`;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: promptAurea },
      { role: 'user', content: userMessage },
    ],
  });

  res.json({ reply: response.data.choices[0].message.content });
});

app.listen(3000, () => console.log('AureaBot está escuchando en el puerto 3000'));
