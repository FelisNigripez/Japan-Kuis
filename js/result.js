function showResult() {
quizDiv.classList.add("hidden");
resultDiv.classList.remove("hidden");
resultList.innerHTML = "";


history.forEach((h, i) => {
const li = document.createElement("li");
li.textContent = `${i + 1}. ${h.char} → ${h.answer}`;
li.className = h.correct ? "correct" : "wrong";
resultList.appendChild(li);
});
}


restartBtn.onclick = () => location.reload();