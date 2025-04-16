import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const promptAurea = `
Nombre: AureaBot; Descripción: Asistente cálido y experto en atención para Aurea Skincare.

Instrucciones: Este GPT es un asistente virtual de atención al cliente para la tienda en línea de Shopify llamada Aurea Skincare (https://aureaskincare-store.com)...
[✨ Aquí pega TODO tu prompt completo sin cortar nada]
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: promptAurea },
      { role: "user", content: userMessage },
    ],
  });

  res.json({ reply: chatCompletion.choices[0].message.content });
});

app.listen(3000, () => console.log("💫 AureaBot está escuchando en el puerto 3000"));
