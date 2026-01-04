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
  playlist: [],
  currentIndex: -1,
  currentType: null, // 'file'

  init() {
    const musicUpload = document.getElementById('music-upload');
    const playPauseBtn = document.getElementById('play-pause-music-btn');
    const prevBtn = document.getElementById('prev-music-btn');
    const nextBtn = document.getElementById('next-music-btn');
    const audio = document.getElementById('background-music');

    musicUpload.addEventListener('change', (event) => {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        this.loadPlaylist(files);
      }
    });

    playPauseBtn.addEventListener('click', () => {
      this.togglePlayPause();
    });

    prevBtn.addEventListener('click', () => {
      this.previous();
    });

    nextBtn.addEventListener('click', () => {
      this.next();
    });

    audio.addEventListener('ended', () => {
      this.onEnded();
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      alert('Error memuat file musik. Coba file lain.');
    });
  },

  loadPlaylist(files) {
    this.playlist = files.map(file => ({
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    console.log('Playlist loaded:', this.playlist.length, 'files');
    this.displayPlaylist();
    this.currentIndex = 0;
    this.loadTrack(this.currentIndex);
    this.enableControls();
  },

  displayPlaylist() {
    const playlistDiv = document.getElementById('playlist');
    const playlistItems = document.getElementById('playlist-items');

    playlistItems.innerHTML = '';

    this.playlist.forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.name;
      li.className = index === this.currentIndex ? 'active' : '';
      li.addEventListener('click', () => {
        this.loadTrack(index);
        this.play();
      });
      playlistItems.appendChild(li);
    });

    playlistDiv.classList.remove('hidden');
  },

  loadTrack(index) {
    if (index < 0 || index >= this.playlist.length) return;

    this.currentIndex = index;
    const track = this.playlist[index];
    const audio = document.getElementById('background-music');

    audio.src = track.url;
    audio.load();
    this.currentType = 'file';

    // Generate and set thumbnail
    this.generateThumbnail(track).then(thumbnailSrc => {
      const thumbnailImg = document.getElementById('track-thumbnail');
      thumbnailImg.src = thumbnailSrc;

      // Show current track display
      const currentTrackDiv = document.getElementById('current-track');
      currentTrackDiv.classList.remove('hidden');
    });

    // Update playlist UI
    this.updatePlaylistUI();

    console.log('Loaded track:', track.name);
  },

  async generateThumbnail(track) {
    const fileType = track.file.type.toLowerCase();

    if (fileType.includes('video') || fileType.includes('mp4')) {
      // For video files (MP4), extract thumbnail from video
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = track.url;
        video.currentTime = 1; // Seek to 1 second to get a frame
        video.muted = true;

        video.addEventListener('loadeddata', () => {
          const canvas = document.createElement('canvas');
          canvas.width = 120;
          canvas.height = 120;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailSrc = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnailSrc);
        });

        video.addEventListener('error', () => {
          // Fallback to default image if video fails to load
          resolve('img/7335440.jpg');
        });
      });
    } else {
      // For audio files (MP3, WAV, etc.), use default image from img folder
      return 'img/7335440.jpg';
    }
  },

  updatePlaylistUI() {
    const items = document.querySelectorAll('#playlist-items li');
    items.forEach((item, index) => {
      item.className = index === this.currentIndex ? 'active' : '';
    });
  },

  togglePlayPause() {
    const audio = document.getElementById('background-music');

    if (this.currentType === 'file' && this.playlist.length > 0) {
      if (audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  },

  play() {
    if (this.currentType === 'file' && this.playlist.length > 0) {
      document.getElementById('background-music').play();
    }
    this.updateControls(true);
  },

  pause() {
    if (this.currentType === 'file') {
      document.getElementById('background-music').pause();
    }
    this.updateControls(false);
  },

  stop() {
    if (this.currentType === 'file') {
      const audio = document.getElementById('background-music');
      audio.pause();
      audio.currentTime = 0;
    }
    this.updateControls(false);
  },

  previous() {
    if (this.playlist.length > 0) {
      const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.playlist.length - 1;
      this.loadTrack(newIndex);
      this.play();
    }
  },

  next() {
    if (this.playlist.length > 0) {
      const newIndex = this.currentIndex < this.playlist.length - 1 ? this.currentIndex + 1 : 0;
      this.loadTrack(newIndex);
      this.play();
    }
  },

  onEnded() {
    // Auto-play next track
    this.next();
  },

  enableControls() {
    this.updateControls(false);
  },

  updateControls(isPlaying) {
    const playPauseBtn = document.getElementById('play-pause-music-btn');
    playPauseBtn.disabled = this.playlist.length === 0;
    playPauseBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';

    // Update prev/next buttons
    const hasMultipleTracks = this.playlist.length > 1;
    document.getElementById('prev-music-btn').disabled = !hasMultipleTracks;
    document.getElementById('next-music-btn').disabled = !hasMultipleTracks;
  }
};
