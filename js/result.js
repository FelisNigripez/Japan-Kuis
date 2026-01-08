function showResult() {
quizDiv.classList.add("hidden");
resultDiv.classList.remove("hidden");
resultList.innerHTML = "";

// Calculate totals
const totalCorrect = history.filter(h => h.correct).length;
const totalIncorrect = history.filter(h => !h.correct).length;
const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

// Create result sheet
const resultSheet = document.createElement("div");
resultSheet.className = "result-sheet";

const title = document.createElement("h3");
title.textContent = "Hasil Kuis Tebak Karakter";
resultSheet.appendChild(title);

const statsDiv = document.createElement("div");
statsDiv.className = "result-stats";

const correctDiv = document.createElement("div");
correctDiv.className = "stat-item correct-stat";
correctDiv.innerHTML = `<strong>Total Benar:</strong> ${totalCorrect}`;
statsDiv.appendChild(correctDiv);

const incorrectDiv = document.createElement("div");
incorrectDiv.className = "stat-item incorrect-stat";
incorrectDiv.innerHTML = `<strong>Total Salah:</strong> ${totalIncorrect}`;
statsDiv.appendChild(incorrectDiv);

const percentageDiv = document.createElement("div");
percentageDiv.className = "stat-item percentage-stat";
percentageDiv.innerHTML = `<strong>Persentase:</strong> ${percentage}%`;
statsDiv.appendChild(percentageDiv);

resultSheet.appendChild(statsDiv);

// Optional: Show detailed list if needed
const detailsToggle = document.createElement("button");
detailsToggle.textContent = "Tampilkan Detail";
detailsToggle.className = "details-toggle";
resultSheet.appendChild(detailsToggle);

const detailsList = document.createElement("ul");
detailsList.className = "result-details hidden";
history.forEach((h, i) => {
const li = document.createElement("li");
li.textContent = `${i + 1}. ${h.char} → ${h.answer}`;
li.className = h.correct ? "correct" : "wrong";
detailsList.appendChild(li);
});
resultSheet.appendChild(detailsList);

detailsToggle.onclick = () => {
detailsList.classList.toggle("hidden");
detailsToggle.textContent = detailsList.classList.contains("hidden") ? "Tampilkan Detail" : "Sembunyikan Detail";
};

resultList.appendChild(resultSheet);
}


restartBtn.onclick = () => location.reload();