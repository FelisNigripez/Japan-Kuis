playBtn.onclick = () => {
questionTimer = Number(timerInput.value);
totalQuestions = Number(totalInput.value);
totalSpan.textContent = totalQuestions;


selectedLetters = mode === "kanji"
? Object.keys(kanji)
: Array.from(lettersContainer.querySelectorAll("input:checked")).map(c => c.value);


if (selectedLetters.length === 0) {
alert("Pilih minimal satu huruf!");
return;
}


history = [];
count = 0;
menuDiv.classList.add("hidden");
quizDiv.classList.remove("hidden");
nextQuestion();
};


function nextQuestion() {
if (count >= totalQuestions) {
showResult();
return;
}


count++;
countSpan.textContent = count;


const source = mode === "hiragana" ? hiragana : mode === "katakana" ? katakana : kanji;
currentChar = selectedLetters[Math.floor(Math.random() * selectedLetters.length)];
currentAnswer = source[currentChar];


questionDiv.textContent = currentChar;
answerInput.value = "";
answerInput.classList.remove("correct", "wrong", "input-error");
startTimer();
}


function startTimer() {
clearInterval(timer);
timeLeft = questionTimer;
timerDiv.textContent = `Waktu: ${timeLeft} detik`;


timer = setInterval(() => {
timeLeft--;
timerDiv.textContent = `Waktu: ${timeLeft} detik`;
if (timeLeft <= 0) {
clearInterval(timer);
submitAnswer(true);
}
}, 1000);
}


function submitAnswer(isTimeout = false) {
if (!isTimeout && answerInput.value.trim() === "") {
answerInput.classList.add("input-error");
setTimeout(() => answerInput.classList.remove("input-error"), 200);
return;
}


clearInterval(timer);


const userAnswer = isTimeout ? "(tidak dijawab)" : answerInput.value.trim().toUpperCase();
const isCorrect = !isTimeout && userAnswer === currentAnswer;


history.push({ char: currentChar, answer: userAnswer, correct: isCorrect });
if (!isTimeout) answerInput.classList.add(isCorrect ? "correct" : "wrong");


setTimeout(() => {
answerInput.classList.remove("correct", "wrong", "input-error");
nextQuestion();
}, 100);
}


submitBtn.onclick = () => submitAnswer(false);

answerInput.addEventListener("keyup", e => {
  if (e.key === "Enter") submitAnswer(false);
});

answerInput.addEventListener("input", () => {
  if (answerInput.value.trim() !== "") {
    answerInput.classList.remove("input-error");
  }
});