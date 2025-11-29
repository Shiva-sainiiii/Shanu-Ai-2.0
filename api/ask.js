export default async function handler(req, res) {
  try {
    const { mode, user } = req.body;

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.HF_KEY
      },
      body: JSON.stringify({
        model: "moonshotai/Kimi-K2-Instruct-0905",
        messages: [
          {
            role: "system",
            content: `Your name is Shanu. Created by Shiva Saini.
                      Always reply in Hinglish. Behaviour: ${mode}`
          },
          { role: "user", content: user }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Error generating reply.";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ reply: "Server Error!" });
  }
}