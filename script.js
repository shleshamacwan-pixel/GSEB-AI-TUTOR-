const button = document.getElementById("generate");
const answer = document.getElementById("answer");

button.addEventListener("click", async () => {

const subject = document.getElementById("subject").value;
const marks = document.getElementById("marks").value;
const question = document.getElementById("question").value;

if (question.trim() === "") {
    answer.innerHTML = "Please enter a question.";
    return;
}

answer.innerHTML = "Generating answer...";

const prompt = `You are an expert GSEB Board teacher.

Subject: ${subject}
Marks: ${marks}

Question:
${question}

Instructions:
1. Answer according to GSEB Board style.
2. Use simple language.
3. Give Introduction.
4. Give the Main Answer.
5. Give Conclusion.
6. If subject is Gujarati, answer in Gujarati.
7. If subject is Sanskrit, answer in Sanskrit wherever appropriate.
8. If subject is English, answer in English.`;

try {

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

method: "POST",

headers: {
"Authorization": `Bearer ${OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
},

body: JSON.stringify({

model: "openrouter/auto",

messages: [
{
role: "user",
content: prompt
}
]

})

});
    const data = await response.json();

if (!response.ok) {
    throw new Error(data.error?.message || "Request failed");
}

answer.innerHTML = data.choices[0].message.content;

} catch (error) {

console.error(error);

answer.innerHTML =
"Error: " + error.message;

}

});
