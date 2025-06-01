<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Không gian tình yêu 3D</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      height: 100vh;
      background: #000;
      font-family: 'Arial', sans-serif;
      touch-action: none;
    }

    .scene {
      width: 100vw;
      height: 100vh;
      perspective: 1000px;
      overflow: hidden;
    }

    .world {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: rotateX(0deg) rotateY(0deg);
      transition: transform 0.1s ease-out;
      position: relative;
    }

    .item {
      position: absolute;
      color: #fff0f5;
      font-weight: bold;
      text-shadow: 0 0 10px #ff4d6d;
      padding: 6px 10px;
      border-radius: 12px;
      background: rgba(255, 77, 109, 0.15);
      white-space: nowrap;
      opacity: 0;
      animation: floatDown linear forwards;
    }

    @keyframes floatDown {
      0% {
        transform: translateY(-200px) scale(0.5) translateZ(var(--z));
        opacity: 0;
      }
      30% {
        transform: translateY(0) scale(1.3) translateZ(var(--z));
        opacity: 1;
      }
      40% {
        transform: translateY(10px) scale(1) translateZ(var(--z));
      }
      100% {
        transform: translateY(100vh) scale(0.9) translateZ(var(--z));
        opacity: 0;
      }
    }

    .mini-heart {
      position: absolute;
      color: red;
      font-size: 12px;
      opacity: 1;
      animation: miniFly 1s ease-out forwards;
      pointer-events: none;
    }

    @keyframes miniFly {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--x), var(--y)) scale(0.6);
        opacity: 0;
      }
    }
  </style>
</head>
<body>

<div class="scene">
  <div class="world" id="world"></div>
</div>

<script>
  const messages = [
    '❤️', '💓', '💖', '💘', '💝',
    'Tớ yêu T... H..',
    'Rất vui khi gặp cậu',
    'Cảm ơn vì đã đến bên tớ',
    '3', '7', '2011',
    'Ngày đặc biệt của tụi mình',
    'T H là một điều dễ thương',
    'Cậu là người tớ luôn nhớ',
    'Yêu cậu nhiều lắm',
    'Chúng ta sẽ mãi bên nhau nhé',
    'Không ai thay thế được cậu',
    'Ánh mắt cậu làm tim tớ rung rinh',
    'Chỉ muốn được ở cạnh cậu',
    'Tình yêu màu hồng ❤️'
  ];

  const world = document.getElementById('world');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  function createHeart() {
    const el = document.createElement('div');
    el.className = 'item';
    const text = messages[Math.floor(Math.random() * messages.length)];
    el.textContent = text;

    // Giảm font nếu chuỗi dài
    if (text.length > 15) {
      el.style.fontSize = '12px';
    } else if (text.length > 8) {
      el.style.fontSize = '14px';
    } else {
      el.style.fontSize = `${Math.random() * 8 + 18}px`;
    }

    const x = Math.random() * (screenWidth - 120);
    const y = Math.random() * (screenHeight / 2);
    const z = (Math.random() - 0.5) * 600;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--z', `${z}px`);
    el.style.animationDuration = `${Math.random() * 3 + 5}s`;

    world.appendChild(el);

    // Hiệu ứng trái tim nhỏ nổ ra
    setTimeout(() => {
      explodeMiniHearts(x, y);
    }, 400);

    setTimeout(() => {
      el.remove();
    }, 10000);
  }

  function explodeMiniHearts(x, y) {
    for (let i = 0; i < 6; i++) {
      const mini = document.createElement('div');
      mini.className = 'mini-heart';
      mini.textContent = '❤️';

      // Vị trí gốc
      mini.style.left = `${x}px`;
      mini.style.top = `${y}px`;

      // Đặt hướng bay
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
      mini.style.setProperty('--x', `${offsetX}px`);
      mini.style.setProperty('--y', `${offsetY}px`);

      world.appendChild(mini);

      setTimeout(() => {
        mini.remove();
      }, 1000);
    }
  }

  // Tăng tần suất sinh trái tim
  setInterval(() => {
    for (let i = 0; i < 6; i++) {
      createHeart();
    }
  }, 500);

  // Cảm ứng xoay 3D
  let lastX, lastY, rotateX = 0, rotateY = 0;
  let isDragging = false;

  document.addEventListener('touchstart', (e) => {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - lastX;
    const deltaY = e.touches[0].clientY - lastY;
    rotateY += deltaX * 0.3;
    rotateX -= deltaY * 0.3;
    world.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
</script>

</body>
</html>