const guessBtn = document.getElementById("guess-btn");
const guessSubmenu = document.getElementById("guess-submenu");
const subModeBtns = document.querySelectorAll(".sub-mode-btn");

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
