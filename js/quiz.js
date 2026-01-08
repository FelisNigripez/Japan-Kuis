let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  Object.values(SoundManager).forEach(sound => {
    if (sound instanceof Audio) {
      sound.muted = true;
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
        sound.muted = false;
      }).catch(() => {});
    }
  });

  audioUnlocked = true;
}

playBtn.onclick = () => {
  unlockAudio(); // 🔊 WAJIB
  SoundManager.play(SoundManager.wordCorrect);

  questionTimer = Number(timerInput.value);
  totalQuestions = Number(totalInput.value);
  totalSpan.textContent = totalQuestions;

  selectedLetters = mode === "kanji"
    ? Object.keys(kanji)
    : Array.from(
        lettersContainer.querySelectorAll("input:checked")
      ).map(c => c.value);

  if (selectedLetters.length === 0) {
    alert("Pilih minimal satu huruf!");
    return;
  }

  history = [];
  count = 0;

  menuDiv.classList.add("hidden");
  quizDiv.classList.remove("hidden");

  hintVisible = false;
hintContainer.classList.add("hidden");
toggleHintBtn.textContent = "Tampilkan arti";


  nextQuestion();
};

function nextQuestion() {
  if (count >= totalQuestions) {
    showQuizResultOverlay();
    return;
  }

  count++;
  countSpan.textContent = count;

  const source =
    mode === "hiragana" ? hiragana :
    mode === "katakana" ? katakana :
    kanji;

  currentChar =
    selectedLetters[Math.floor(Math.random() * selectedLetters.length)];
  currentAnswer = source[currentChar];

  questionDiv.textContent = currentChar;
  // reset hint
hintVisible = false;
hintContainer.classList.add("hidden");
toggleHintBtn.textContent = "Tampilkan arti";

// isi hint sesuai mode
if (mode === "hiragana" || mode === "katakana") {
  hintText.textContent = currentAnswer; // romaji
} else if (mode === "kanji") {
  hintText.textContent = currentAnswer; // arti / bacaan
}

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
  // ❌ JAWABAN KOSONG
  if (!isTimeout && answerInput.value.trim() === "") {
    answerInput.classList.add("input-error");

    // 🔊 SOUND SALAH (KOSONG) — FIX
    SoundManager.play(SoundManager.typeWrong);

    setTimeout(() => {
      answerInput.classList.remove("input-error");
    }, 200);
    return;
  }

  clearInterval(timer);

  const userAnswer = isTimeout
    ? "(tidak dijawab)"
    : answerInput.value.trim().toUpperCase();

  const isCorrect =
    !isTimeout && userAnswer === currentAnswer;

  history.push({
    char: currentChar,
    answer: userAnswer,
    correct: isCorrect
  });

  if (!isTimeout) {
    answerInput.classList.add(isCorrect ? "correct" : "wrong");

    // 🔊 SOUND BENAR / SALAH
    SoundManager.play(
      isCorrect ? SoundManager.typeCorrect : SoundManager.typeWrong
    );
  }

  setTimeout(() => {
    answerInput.classList.remove("correct", "wrong", "input-error");
    nextQuestion();
  }, 150);
}

// 🟢 BUTTON SUBMIT
submitBtn.onclick = () => submitAnswer(false);

// 🟢 ENTER KEY
answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitAnswer(false);
  }
});

// 🟢 HAPUS ERROR SAAT MENGETIK
// 🟢 SOUND + VALIDASI SAAT MENGETIK
answerInput.addEventListener("input", () => {
  const value = answerInput.value.trim().toUpperCase();

  if (value === "") return;

  // hapus error merah
  answerInput.classList.remove("input-error");

  // 🔊 CEK KETIKAN REAL-TIME
  if (currentAnswer.startsWith(value)) {
    // ✅ KARAKTER BENAR
    SoundManager.play(SoundManager.typeCorrect);
  } else {
    // ❌ KARAKTER SALAH
    SoundManager.play(SoundManager.typeWrong);
  }
});



toggleHintBtn.onclick = () => {
  hintVisible = !hintVisible;

  hintContainer.classList.toggle("hidden", !hintVisible);

  toggleHintBtn.textContent = hintVisible
    ? "Sembunyikan arti"
    : "Tampilkan arti";
};

function showQuizResultOverlay() {
  // Calculate totals
  const totalCorrect = history.filter(h => h.correct).length;
  const totalIncorrect = history.filter(h => !h.correct).length;
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Update overlay elements
  document.getElementById('total-correct').textContent = totalCorrect;
  document.getElementById('total-incorrect').textContent = totalIncorrect;
  document.getElementById('percentage').textContent = percentage + '%';

  // Show overlay
  document.getElementById('quiz-result-overlay').classList.remove('hidden');
}

// Event listeners for overlay buttons
document.getElementById('continue-to-full-result').onclick = () => {
  document.getElementById('quiz-result-overlay').classList.add('hidden');
  showResult();
};

document.getElementById('restart-from-overlay').onclick = () => {
  location.reload();
};
