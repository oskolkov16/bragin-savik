document.addEventListener('DOMContentLoaded', function () {
  const card = document.querySelector('.card');
  if (!card) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  const maxOffset = 40; // максимальное смещение в px

  // Центр панели
  const cardRect = () => card.getBoundingClientRect();

  // Обновление координат мыши
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Центр экрана
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Смещение относительно центра
    const dx = (mouseX - centerX) / centerX;
    const dy = (mouseY - centerY) / centerY;

    // Интерполяция для плавности
    currentX += (dx * maxOffset - currentX) * 0.21;
    currentY += (dy * maxOffset - currentY) * 0.21;

    // Применяем transform
    card.style.transform =
      `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animate);
  }

  animate();
});