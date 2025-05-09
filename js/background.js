document.addEventListener('DOMContentLoaded', function () {
  // Массив с именами видеофайлов (добавьте свои файлы сюда)
  const videos = [
    'video.mp4',
  ];
  // Последовательный выбор видео с использованием localStorage
  let idx = Number(localStorage.getItem('bgVideoIdx')) || 0;
  idx = idx % videos.length;
  const videoSrc = 'resources/videos/' + videos[idx];
  localStorage.setItem('bgVideoIdx', (idx + 1) % videos.length);

  // Установка источника видео
  const bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    bgVideo.src = videoSrc;
    bgVideo.load();
    bgVideo.play();
  }
});