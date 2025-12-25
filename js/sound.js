/* =========================
   SOUND MANAGER
========================= */
const SoundManager = {
  typeCorrect: new Audio("sound/harddrop.mp3"),
  typeWrong: new Audio("sound/spin.ogg"),
  wordCorrect: new Audio("sound/rotate.ogg"),
  wordWrong: new Audio("sound/spinend.ogg"),

  play(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
  }
};
