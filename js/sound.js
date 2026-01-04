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

// Music Manager
const MusicManager = {
  init() {
    const musicUpload = document.getElementById('music-upload');
    const playBtn = document.getElementById('play-music-btn');
    const pauseBtn = document.getElementById('pause-music-btn');
    const stopBtn = document.getElementById('stop-music-btn');
    const audio = document.getElementById('background-music');

    musicUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('File uploaded:', file.name, 'Type:', file.type);
        const url = URL.createObjectURL(file);
        audio.src = url;
        audio.load(); // Ensure the audio is loaded
        console.log('Audio source set to:', url);
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
      }
    });

    playBtn.addEventListener('click', () => {
      console.log('Play button clicked');
      audio.play().then(() => {
        console.log('Audio playing');
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
      }).catch(error => {
        console.error('Error playing audio:', error);
        alert('Tidak dapat memainkan file musik. Pastikan file audio valid.');
      });
    });

    pauseBtn.addEventListener('click', () => {
      console.log('Pause button clicked');
      audio.pause();
      playBtn.disabled = false;
      pauseBtn.disabled = true;
      stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
      console.log('Stop button clicked');
      audio.pause();
      audio.currentTime = 0;
      playBtn.disabled = false;
      pauseBtn.disabled = true;
      stopBtn.disabled = true;
    });

    audio.addEventListener('ended', () => {
      console.log('Audio ended');
      playBtn.disabled = false;
      pauseBtn.disabled = true;
      stopBtn.disabled = true;
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      alert('Error memuat file musik. Coba file lain.');
    });
  }
};
