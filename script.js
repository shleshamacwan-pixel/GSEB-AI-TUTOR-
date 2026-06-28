async function askAI() {
  let input = document.getElementById("userInput").value;

  document.getElementById("response").innerText = "Thinking...";

  let res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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
      "
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: input }]
    })
  });

  let data = await res.json();

  document.getElementById("response").innerText =
    data.choices[0].message.content;
}
