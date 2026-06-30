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
