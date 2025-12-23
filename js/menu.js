    modeBtns.forEach(btn => {
    btn.onclick = () => {
  const isActive = btn.classList.contains("active");
  modeBtns.forEach(b => b.classList.remove("active"));

  if (isActive) {
    letterSelectionDiv.classList.add("hidden");
    playBtn.disabled = true;
    mode = null;
    return;
  }

  btn.classList.add("active");
  mode = btn.dataset.mode;

  /* =====================
     TYPING MODE
  ===================== */
  if (mode === "typing") {
    playBtn.disabled = true;
    letterSelectionDiv.classList.add("hidden");
    startTypingMode();   // 🔥 INI KUNCI UTAMA
    return;
  }

  /* =====================
     QUIZ MODE
  ===================== */
  playBtn.disabled = false;

  if (mode === "hiragana" || mode === "katakana") {
    letterSelectionDiv.classList.remove("hidden");
    populateLetters();
  } else {
    letterSelectionDiv.classList.add("hidden");
  }
};

    });

