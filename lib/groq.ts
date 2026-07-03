export type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not configured. Groq requests will not work until the key is provided.");
}

export async function generateGroqResponse(messages: GroqMessage[]): Promise<string | null> {
  if (!GROQ_API_KEY) {
    console.warn("generateGroqResponse: missing GROQ_API_KEY");
    return null;
  }

  const body = {
    model: GROQ_MODEL,
    messages,
    temperature: 0.6,
    max_tokens: 700,
  };

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error("Groq request failed", {
        status: response.status,
        statusText: response.statusText,
        model: GROQ_MODEL,
        body: text,
      });
      return null;
    }

    const data = JSON.parse(text);
    return data?.choices?.[0]?.message?.content ?? data?.output?.text ?? null;
  } catch (error) {
    console.error("Groq request threw an exception", {
      error: error instanceof Error ? error.message : String(error),
      model: GROQ_MODEL,
    });
    return null;
  }
}
