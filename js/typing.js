/* =========================
   DATA TYPING
========================= */
const typingWords = [
  { jp: "あい", romaji: "ai", arti: "cinta" },
  { jp: "あお", romaji: "ao", arti: "biru" },
  { jp: "あか", romaji: "aka", arti: "merah" },
  { jp: "あさ", romaji: "asa", arti: "pagi" },
  { jp: "あし", romaji: "ashi", arti: "kaki" },
  { jp: "あめ", romaji: "ame", arti: "hujan" },
  { jp: "いえ", romaji: "ie", arti: "rumah" },
  { jp: "いけ", romaji: "ike", arti: "kolam" },
  { jp: "いし", romaji: "ishi", arti: "batu" },
  { jp: "いぬ", romaji: "inu", arti: "anjing" },
  { jp: "いま", romaji: "ima", arti: "sekarang" },
  { jp: "うえ", romaji: "ue", arti: "atas" },
  { jp: "うみ", romaji: "umi", arti: "laut" },
  { jp: "うた", romaji: "uta", arti: "lagu" },
  { jp: "えき", romaji: "eki", arti: "stasiun" },
  { jp: "えん", romaji: "en", arti: "yen" },
  { jp: "おか", romaji: "oka", arti: "bukit" },
  { jp: "おと", romaji: "oto", arti: "suara" },
  { jp: "おや", romaji: "oya", arti: "orang tua" },

  { jp: "かお", romaji: "kao", arti: "wajah" },
  { jp: "かさ", romaji: "kasa", arti: "payung" },
  { jp: "かぜ", romaji: "kaze", arti: "angin" },
  { jp: "かみ", romaji: "kami", arti: "kertas" },
  { jp: "かわ", romaji: "kawa", arti: "sungai" },
  { jp: "き", romaji: "ki", arti: "pohon" },
  { jp: "きく", romaji: "kiku", arti: "mendengar" },
  { jp: "きた", romaji: "kita", arti: "utara" },
  { jp: "きょう", romaji: "kyou", arti: "hari ini" },
  { jp: "くに", romaji: "kuni", arti: "negara" },
  { jp: "くるま", romaji: "kuruma", arti: "mobil" },
  { jp: "けさ", romaji: "kesa", arti: "pagi ini" },
  { jp: "こえ", romaji: "koe", arti: "suara" },
  { jp: "こころ", romaji: "kokoro", arti: "hati" },
  { jp: "こども", romaji: "kodomo", arti: "anak" },

  { jp: "さかな", romaji: "sakana", arti: "ikan" },
  { jp: "さくら", romaji: "sakura", arti: "bunga sakura" },
  { jp: "さと", romaji: "sato", arti: "desa" },
  { jp: "しお", romaji: "shio", arti: "garam" },
  { jp: "しま", romaji: "shima", arti: "pulau" },
  { jp: "しろ", romaji: "shiro", arti: "putih" },
  { jp: "すし", romaji: "sushi", arti: "sushi" },
  { jp: "すな", romaji: "suna", arti: "pasir" },
  { jp: "せかい", romaji: "sekai", arti: "dunia" },
  { jp: "せん", romaji: "sen", arti: "seribu" },
  { jp: "そら", romaji: "sora", arti: "langit" },

  { jp: "たまご", romaji: "tamago", arti: "telur" },
  { jp: "たに", romaji: "tani", arti: "lembah" },
  { jp: "ちず", romaji: "chizu", arti: "peta" },
  { jp: "ちち", romaji: "chichi", arti: "ayah" },
  { jp: "つき", romaji: "tsuki", arti: "bulan" },
  { jp: "つくえ", romaji: "tsukue", arti: "meja" },
  { jp: "て", romaji: "te", arti: "tangan" },
  { jp: "てら", romaji: "tera", arti: "kuil" },
  { jp: "とけい", romaji: "tokei", arti: "jam" },
  { jp: "ともだち", romaji: "tomodachi", arti: "teman" },

  { jp: "なつ", romaji: "natsu", arti: "musim panas" },
  { jp: "なまえ", romaji: "namae", arti: "nama" },
  { jp: "にく", romaji: "niku", arti: "daging" },
  { jp: "にし", romaji: "nishi", arti: "barat" },
  { jp: "にほん", romaji: "nihon", arti: "Jepang" },
  { jp: "ねこ", romaji: "neko", arti: "kucing" },
  { jp: "ねつ", romaji: "netsu", arti: "demam" },
  { jp: "のり", romaji: "nori", arti: "rumput laut" },

  { jp: "はな", romaji: "hana", arti: "bunga" },
  { jp: "はは", romaji: "haha", arti: "ibu" },
  { jp: "はる", romaji: "haru", arti: "musim semi" },
  { jp: "ひ", romaji: "hi", arti: "api / matahari" },
  { jp: "ひと", romaji: "hito", arti: "orang" },
  { jp: "ひる", romaji: "hiru", arti: "siang" },
  { jp: "ふく", romaji: "fuku", arti: "baju" },
  { jp: "ふね", romaji: "fune", arti: "kapal" },
  { jp: "へや", romaji: "heya", arti: "kamar" },
  { jp: "ほし", romaji: "hoshi", arti: "bintang" },
  { jp: "ほん", romaji: "hon", arti: "buku" },

  { jp: "まち", romaji: "machi", arti: "kota" },
  { jp: "まど", romaji: "mado", arti: "jendela" },
  { jp: "みず", romaji: "mizu", arti: "air" },
  { jp: "みみ", romaji: "mimi", arti: "telinga" },
  { jp: "むし", romaji: "mushi", arti: "serangga" },
  { jp: "め", romaji: "me", arti: "mata" },
  { jp: "もり", romaji: "mori", arti: "hutan" },

  { jp: "やま", romaji: "yama", arti: "gunung" },
  { jp: "ゆき", romaji: "yuki", arti: "salju" },
  { jp: "よる", romaji: "yoru", arti: "malam" },

  { jp: "らく", romaji: "raku", arti: "mudah" },
  { jp: "りんご", romaji: "ringo", arti: "apel" },
  { jp: "れきし", romaji: "rekishi", arti: "sejarah" },
  { jp: "ろく", romaji: "roku", arti: "enam" },

  { jp: "わたし", romaji: "watashi", arti: "saya" },
  { jp: "わるい", romaji: "warui", arti: "buruk" }
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* =========================
   STATE
========================= */
let typingIndex = 0;
let typingTime = 60;
let typingTimer = null;
let meaningVisible = false; // ⬅ awalnya DISMBUNYIKAN

let combo = 0;
let maxCombo = 0;

let correctWords = 0;
let totalTypedWords = 0;
let typingStartTime = 0;

let streakCount = 0;
let maxStreak = 0;




/* =========================
   ELEMENTS
========================= */
const typingDiv = document.getElementById("typing-mode");
const typingText = document.getElementById("typing-text");
const typingInput = document.getElementById("typing-input");
const typingTimerSpan = document.getElementById("typing-timer");
const typingMeaning = document.getElementById("typing-meaning");
const typingExitBtn = document.getElementById("typing-exit");
const toggleMeaningBtn = document.getElementById("toggle-meaning");
const typingWpmSpan = document.getElementById("typing-wpm");
const typingAccuracySpan = document.getElementById("typing-accuracy");
typingText.addEventListener("wheel", e => e.preventDefault());
typingText.addEventListener("touchmove", e => e.preventDefault());
const typingStreak = document.getElementById("typing-streak");



/* =========================
   START TYPING MODE
========================= */
function startTypingMode() {
  shuffleTypingWords();

  combo = 0;
  maxCombo = 0;
  document.getElementById("combo-display").classList.add("hidden");

  streakCount = 0;
maxStreak = 0;
typingStreak.classList.add("hidden");
typingStreak.textContent = "🔥 STREAK x0";



  shuffleArray(typingWords);

  // sembunyikan menu & kuis
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("quiz-result").classList.add("hidden");
  document.getElementById("typing-stats").classList.add("hidden");

meaningVisible = false;
typingMeaning.classList.add("hidden-meaning");
toggleMeaningBtn.textContent = "Tampilkan arti";

  // tampilkan typing
  typingDiv.classList.remove("hidden");

  // reset state
  typingIndex = 0;
  typingTime = 60;
  typingInput.disabled = false;
  typingInput.value = "";

  renderTypingText();
  updateMeaning();

  typingInput.focus();
  startTypingTimer();

  correctWords = 0;
totalTypedWords = 0;
typingStartTime = Date.now();

typingWpmSpan.textContent = "0";
typingAccuracySpan.textContent = "0%";

}

/* =========================
   RENDER TEXT
========================= */
function renderTypingText() {
  typingText.innerHTML = "";

  typingWords.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word.jp;

    if (index === typingIndex) {
      span.classList.add("current");
    }

    typingText.appendChild(span);
  });
}

function scrollToCurrentWord() {
  const current = typingText.querySelector(".current");
  if (!current) return;

  const containerTop = typingText.scrollTop;
  const containerBottom = containerTop + typingText.clientHeight;

  const wordTop = current.offsetTop;
  const wordBottom = wordTop + current.offsetHeight;

  // ⛔ JANGAN SCROLL kalau masih terlihat
  if (wordTop >= containerTop && wordBottom <= containerBottom) {
    return;
  }

  // ✅ SCROLL HALUS ke bawah secukupnya
  typingText.scrollTop = wordBottom - typingText.clientHeight;
}




/* =========================
   UPDATE MEANING
========================= */
function updateMeaning() {
  typingMeaning.textContent =
    typingWords[typingIndex]?.arti || "";
}

/* =========================
   TIMER
========================= */
function startTypingTimer() {
  clearInterval(typingTimer);
  typingTimerSpan.textContent = typingTime;

  typingTimer = setInterval(() => {
    typingTime--;
    typingTimerSpan.textContent = typingTime;

    if (typingTime <= 0) {
      clearInterval(typingTimer);
      typingInput.disabled = true;
      alert("Waktu habis!");
      document.getElementById("typing-stats").classList.remove("hidden");
    }
  }, 1000);
}

/* =========================
   INPUT HANDLER
========================= */
typingInput.addEventListener("input", () => {
  const value = typingInput.value.toLowerCase();
  const target = typingWords[typingIndex]?.romaji || "";

  if (!value) return;

  if (target.startsWith(value)) {
    SoundManager.play(SoundManager.typeCorrect);
  } else {
    SoundManager.play(SoundManager.typeWrong);
  }
  
});

typingInput.addEventListener("keydown", e => {
  if (e.key !== " ") return;

  e.preventDefault();

  const userInput = typingInput.value.trim().toLowerCase();
  if (userInput === "") return;

  totalTypedWords++;

  const currentWord = typingWords[typingIndex];
  const spans = typingText.querySelectorAll("span");

  // hapus status current lama
  spans[typingIndex].classList.remove("current");

  const isCorrect =
    userInput === currentWord.romaji ||
    userInput === currentWord.jp;

  if (isCorrect) {
    correctWords++;
    spans[typingIndex].classList.add("correct-word");

    updateCombo(true);
    SoundManager.play(SoundManager.wordCorrect);
  } else {
    spans[typingIndex].classList.add("wrong-word");

    updateCombo(false);
    SoundManager.play(SoundManager.wordWrong);
  }

  updateTypingStats();

  // 🔥 NAIK INDEX SATU KALI SAJA
  typingIndex++;

  typingInput.value = "";

  // 🔁 JIKA HABIS → LOOP
  if (typingIndex >= typingWords.length) {
    typingIndex = 0;
    shuffleTypingWords();
    renderTypingText();
  }

  // set current baru
  const newSpans = typingText.querySelectorAll("span");
  newSpans[typingIndex].classList.add("current");

  updateMeaning();
  scrollToCurrentWord();
});




/* =========================
   EXIT BUTTON
========================= */
typingExitBtn.addEventListener("click", () => {
  typingDiv.classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
});

toggleMeaningBtn.addEventListener("click", () => {
  meaningVisible = !meaningVisible;

  typingMeaning.classList.toggle("hidden-meaning", !meaningVisible);

  toggleMeaningBtn.textContent = meaningVisible
    ? "Sembunyikan arti"
    : "Tampilkan arti";
});

function updateTypingStats() {
  const elapsedTime =
    (Date.now() - typingStartTime) / 1000;

  const wpm =
    elapsedTime > 0
      ? Math.round((correctWords / elapsedTime) * 60)
      : 0;

  const accuracy =
    totalTypedWords > 0
      ? Math.round((correctWords / totalTypedWords) * 100)
      : 0;

  typingWpmSpan.textContent = wpm;
  typingAccuracySpan.textContent = accuracy + "%";
}

function updateCombo(isCorrect) {
  const comboEl = document.getElementById("combo-display");
  const comboCount = document.getElementById("combo-count");

  if (isCorrect) {
    combo++;
    if (combo > maxCombo) maxCombo = combo;

    comboEl.classList.remove("hidden");
    comboCount.textContent = combo;

    comboEl.classList.add("pop");
    setTimeout(() => comboEl.classList.remove("pop"), 150);
  } else {
    combo = 0;
    comboCount.textContent = combo;
    comboEl.classList.add("hidden");
  }
}

function shuffleTypingWords() {
  
  for (let i = typingWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [typingWords[i], typingWords[j]] = [typingWords[j], typingWords[i]];
  }
}
