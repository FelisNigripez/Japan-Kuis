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
    const video = document.getElementById('track-video');

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

    // Audio event listeners
    audio.addEventListener('ended', () => {
      this.onEnded();
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      alert('Error memuat file musik. Coba file lain.');
    });

    audio.addEventListener('timeupdate', () => {
      this.updateProgress();
    });

    audio.addEventListener('loadedmetadata', () => {
      this.updateProgress();
    });

    // Video event listeners
    video.addEventListener('ended', () => {
      this.onEnded();
    });

    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      alert('Error memuat file video. Coba file lain.');
    });

    video.addEventListener('timeupdate', () => {
      this.updateProgress();
    });

    video.addEventListener('loadedmetadata', () => {
      this.updateProgress();
    });

    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', (e) => {
      this.seekToClick(e);
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
    const video = document.getElementById('track-video');

    // Reset progress bar
    const progressTrack = document.getElementById('music-progress-track');
    const progressThumb = document.getElementById('music-progress-thumb');
    progressTrack.style.width = '0%';
    progressThumb.style.left = '0px';
    document.getElementById('music-time').textContent = '0:00 / 0:00';

    // Generate and set thumbnail or video
    const fileType = track.file.type.toLowerCase();
    if (fileType.includes('video') || fileType.includes('mp4')) {
      // For video files, show the video element and use video for playback
      video.src = track.url;
      video.muted = false; // Enable sound for video
      video.load(); // Ensure video loads
      video.style.display = 'block';
      document.getElementById('track-thumbnail').style.display = 'none';
      this.currentType = 'video';

      // Show current track display
      const currentTrackDiv = document.getElementById('current-track');
      currentTrackDiv.classList.remove('hidden');
    } else {
      // For audio files, use audio element and generate thumbnail
      audio.src = track.url;
      audio.load();
      this.currentType = 'audio';

      this.generateThumbnail(track).then(thumbnailSrc => {
        const thumbnailImg = document.getElementById('track-thumbnail');
        thumbnailImg.src = thumbnailSrc;
        thumbnailImg.style.display = 'block';
        document.getElementById('track-video').style.display = 'none';

        // Show current track display
        const currentTrackDiv = document.getElementById('current-track');
        currentTrackDiv.classList.remove('hidden');
      });
    }

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
    const video = document.getElementById('track-video');

    if (this.playlist.length > 0) {
      if (this.currentType === 'audio') {
        if (audio.paused) {
          this.play();
        } else {
          this.pause();
        }
      } else if (this.currentType === 'video') {
        if (video.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
    }
  },

  play() {
    if (this.playlist.length > 0) {
      if (this.currentType === 'audio') {
        document.getElementById('background-music').play();
      } else if (this.currentType === 'video') {
        document.getElementById('track-video').play();
      }
    }
    this.updateControls(true);
  },

  pause() {
    if (this.playlist.length > 0) {
      if (this.currentType === 'audio') {
        document.getElementById('background-music').pause();
      } else if (this.currentType === 'video') {
        document.getElementById('track-video').pause();
      }
    }
    this.updateControls(false);
  },

  stop() {
    if (this.playlist.length > 0) {
      if (this.currentType === 'audio') {
        const audio = document.getElementById('background-music');
        audio.pause();
        audio.currentTime = 0;
      } else if (this.currentType === 'video') {
        const video = document.getElementById('track-video');
        video.pause();
        video.currentTime = 0;
      }
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
    const progressContainer = document.querySelector('.progress-container');

    playPauseBtn.disabled = this.playlist.length === 0;
    playPauseBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';

    // Update prev/next buttons
    const hasMultipleTracks = this.playlist.length > 1;
    document.getElementById('prev-music-btn').disabled = !hasMultipleTracks;
    document.getElementById('next-music-btn').disabled = !hasMultipleTracks;

    // Enable/disable progress bar
    if (this.playlist.length === 0) {
      progressContainer.style.opacity = '0.5';
      progressContainer.style.pointerEvents = 'none';
    } else {
      progressContainer.style.opacity = '1';
      progressContainer.style.pointerEvents = 'auto';
    }
  },

  updateProgress() {
    const audio = document.getElementById('background-music');
    const video = document.getElementById('track-video');
    const progressTrack = document.getElementById('music-progress-track');
    const progressThumb = document.getElementById('music-progress-thumb');
    const progressContainer = document.querySelector('.progress-container');
    const timeDisplay = document.getElementById('music-time');

    let mediaElement;
    if (this.currentType === 'audio') {
      mediaElement = audio;
    } else if (this.currentType === 'video') {
      mediaElement = video;
    } else {
      return;
    }

    if (mediaElement.duration && !isNaN(mediaElement.duration)) {
      const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
      const containerWidth = progressContainer.offsetWidth;
      const thumbPosition = (progress / 100) * containerWidth;

      progressTrack.style.width = `${progress}%`;
      progressThumb.style.left = `${thumbPosition}px`;

      const currentTime = this.formatTime(mediaElement.currentTime);
      const duration = this.formatTime(mediaElement.duration);
      timeDisplay.textContent = `${currentTime} / ${duration}`;
    }
  },

  seekToClick(e) {
    const audio = document.getElementById('background-music');
    const video = document.getElementById('track-video');
    const progressContainer = document.querySelector('.progress-container');
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;

    let mediaElement;
    if (this.currentType === 'audio') {
      mediaElement = audio;
    } else if (this.currentType === 'video') {
      mediaElement = video;
    } else {
      return;
    }

    if (mediaElement.duration && !isNaN(mediaElement.duration)) {
      const seekPercent = (clickX / containerWidth) * 100;
      const seekTime = (seekPercent / 100) * mediaElement.duration;
      mediaElement.currentTime = seekTime;
      this.updateProgress();
    }
  },

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};
