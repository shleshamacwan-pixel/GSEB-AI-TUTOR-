pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let textbook = null;
let textbookText = "";

const pdfFile = document.getElementById("pdfFile");
const pdfStatus = document.getElementById("pdfStatus");

pdfFile.addEventListener("change", async () => {

textbook = pdfFile.files[0];

if (!textbook) return;

localStorage.setItem("textbookName", textbook.name);

pdfStatus.innerHTML = "📖 Reading textbook...";

const arrayBuffer = await textbook.arrayBuffer();

const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer
}).promise;

pdfStatus.innerHTML =
"📚 PDF Loaded (" + pdf.numPages + " pages)";
});

const button = document.getElementById("generate");
const answer = document.getElementById("answer");

button.addEventListener("click", async () => {

const subject = document.getElementById("subject").value;
const marks = document.getElementById("marks").value;
const question = document.getElementById("question").value;

if(question.trim()==""){
answer.innerHTML="Please enter a question.";
return;
}

answer.innerHTML="Generating answer...";

const prompt = `You are an expert GSEB teacher.

Subject: ${subject}

Marks: ${marks}

Question:
${question}

Instructions:

1. Write a proper Introduction.

2. Write the Main Answer according to board exam style.

3. Finish with a short Conclusion.

4. Use simple language.

5. If subject is Gujarati, answer in Gujarati.

6. If subject is Sanskrit, answer in Sanskrit wherever appropriate.

7. If subject is English, answer in English.

8. Make the answer suitable for GSEB Board Exams.`;

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

if(data.error){

answer.innerHTML = "Error: " + data.error.message;

return;

}

answer.innerHTML =
data.choices[0].message.content;

} catch (error) {

answer.innerHTML =
"Something went wrong. Please check your internet connection or API key.";

console.error(error);

}

});

window.addEventListener("load", () => {

const savedBook = localStorage.getItem("textbookName");

if(savedBook){

pdfStatus.innerHTML =
"📚 Saved textbook: " + savedBook;

}

});
