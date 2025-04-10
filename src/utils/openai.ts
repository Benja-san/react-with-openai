import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // via .env
  dangerouslyAllowBrowser: true, // Only for client component !!
})

export const askGPT = async (title: string, imageUrl: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Tu es un rédacteur francophone avec un ton léger, drôle et accrocheur. Tu écris une introduction en français, pleine d’esprit et de créativité, à partir d’un titre et d’une image. Ta mission est de surprendre, faire sourire et donner envie de lire. Max **150 mots**. Utilise des figures de style, des références pop ou de l’humour si pertinent. ⚠️ N’écris **que l’introduction**, sans mention explicite du titre ou de l’image.",
        },
        {
          role: "user",
          content: `Titre: ${title}\nImage (à utiliser comme source d'inspiration, ne pas décrire explicitement) : ${imageUrl}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Erreur OpenAI :", error)
    return "Oops, une erreur est survenue 🥲"
  }
}
