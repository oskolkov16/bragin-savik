// Простой музыкальный переключатель
const tracks = [
  { name: "Браги два бидона", src: "resources/music/Браги два бидона.mp3" }
];

let currentTrack = 0;
let isPlaying = false;
let audio = null;

// --- Web Audio API для пульсации ---
let audioCtx = null;
let analyser = null;
let source = null;
let animationId = null;
const card = document.querySelector('.card');

function setupAudioAnalyser() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
  }
  if (source) {
    source.disconnect();
  }
  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function animateCard() {
  if (!analyser || !card) return;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  // Усреднённая амплитуда
  const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
  // Максимальная амплитуда: 0.8..1.8
  const scale = 0.7 + (avg / 255) * 1.0;
  card.style.transform = `translate(-50%, -50%) scale(${scale})`;
  card.style.boxShadow = `0 8px 64px 0 rgba(0,0,0,${0.37 + (avg / 255) * 1.0})`;
  animationId = requestAnimationFrame(animateCard);
}

function stopCardAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (card) {
    card.style.transform = "translate(-50%, -50%) scale(1)";
    card.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
  }
}

const trackName = document.getElementById('track-name');
const playBtn = document.querySelector('.music-btn.play');

function updateTrack() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    stopCardAnimation();
  }
  audio = new Audio(tracks[currentTrack].src);
  trackName.textContent = tracks[currentTrack].name;
  audio.onended = () => {
    playBtn.innerHTML = "&#9654;";
    isPlaying = false;
    stopCardAnimation();
  };
  setupAudioAnalyser();
  if (isPlaying) {
    audio.play().catch(() => {});
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    animateCard();
  }
}
updateTrack();

playBtn.onclick = () => {
  if (!audio) updateTrack();
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = "&#9654;";
    stopCardAnimation();
  } else {
    audio.play().catch(() => {});
    playBtn.innerHTML = "&#10073;&#10073;";
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    animateCard();
  }
  isPlaying = !isPlaying;
};

