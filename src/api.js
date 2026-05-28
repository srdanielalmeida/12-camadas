import { SYSTEM_PROMPT } from "./data";

const GEMINI_API_KEY = "AIzaSyA85Ka9BgMwei9qcJI8d7sL8ExhimOO5BA";
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Envia as respostas do questionário para a API Gemini e retorna o diagnóstico.
 * @param {string[]} respostas - Array com as 5 respostas do usuário.
 * @returns {Promise<object>} - O objeto de diagnóstico parseado.
 */
export async function obterDiagnostico(respostas) {
  const userMessage = `Analise as respostas abaixo e retorne o diagnóstico no formato JSON especificado.

Pergunta 1: ${respostas[0]}
Pergunta 2: ${respostas[1]}
Pergunta 3: ${respostas[2]}
Pergunta 4: ${respostas[3]}
Pergunta 5: ${respostas[4]}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 8192,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  };

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `Erro na API: ${response.status}`
    );
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Resposta vazia da API.");
  }

  // Parse JSON — o Gemini com responseMimeType json já retorna JSON limpo
  const diagnostico = JSON.parse(text);

  // Validação mínima
  const requiredKeys = [
    "camada_identificada",
    "tipo",
    "diagnostico_clinico",
    "o_vicio",
    "a_virtude",
    "reflexao_final",
  ];

  for (const key of requiredKeys) {
    if (!diagnostico[key]) {
      throw new Error(`Campo ausente no diagnóstico: ${key}`);
    }
  }

  return diagnostico;
}
