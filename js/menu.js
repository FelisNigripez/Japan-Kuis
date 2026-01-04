const guessBtn = document.getElementById("guess-btn");
const guessSubmenu = document.getElementById("guess-submenu");
const subModeBtns = document.querySelectorAll(".sub-mode-btn");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

guessBtn.onclick = () => {
  guessSubmenu.classList.toggle("hidden");
};

/* =====================
   PILIH JENIS KARAKTER
===================== */
subModeBtns.forEach(btn => {
  btn.onclick = () => {
    // reset active
    subModeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    mode = btn.dataset.mode;

    // tampilkan filter huruf
    letterSelectionDiv.classList.remove("hidden");
    playBtn.disabled = false;

    populateLetters(); // ⬅ PENTING
  };
});

/* =====================
   TYPING MODE TETAP
===================== */
modeBtns.forEach(btn => {
  if (btn.dataset.mode === "typing") {
    btn.onclick = () => {
      mode = "typing";
      letterSelectionDiv.classList.add("hidden");
      playBtn.disabled = true;
      startTypingMode();
    };
  }
});

  /* =====================
    THEME TOGGLE
  ===================== */
  themeToggleBtn.onclick = () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    themeToggleBtn.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  };

  // Initialize theme on page load
  document.body.classList.toggle("dark-mode", darkMode);
  themeToggleBtn.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
