"use strict";

// Navegação simplificada
function showSection(sectionName) {
  // Esconde todas as seções
  var sections = document.querySelectorAll('.content-section');
  sections.forEach(function (section) {
    return section.classList.remove('active');
  }); // Mostra a seção correspondente

  var targetSection = document.getElementById("".concat(sectionName, "-section"));

  if (targetSection) {
    targetSection.classList.add('active');
  }
} // Navegação com teclado


document.addEventListener('keydown', function (event) {
  var buttons = document.querySelectorAll('.nav-button');
  var currentIndex = Array.from(buttons).findIndex(function (button) {
    return button === document.activeElement;
  });

  if (event.key === 'w' || event.key === 'ArrowUp') {
    if (currentIndex > 0) buttons[currentIndex - 1].focus();else buttons[buttons.length - 1].focus();
  } else if (event.key === 's' || event.key === 'ArrowDown') {
    if (currentIndex < buttons.length - 1) buttons[currentIndex + 1].focus();else buttons[0].focus();
  }
}); // Efeito Matrix no fundo

window.onload = function () {
  var canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.getElementById('matrix').appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
  var matrixChars = matrix.split("");
  var fontSize = 10;
  var columns = canvas.width / fontSize;
  var drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(15, 15, 26, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#50fa7b";
    ctx.font = fontSize + "px monospace";
    drops.forEach(function (y, x) {
      var text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(text, x * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
      drops[x]++;
    });
  }

  setInterval(drawMatrix, 35);
};
//# sourceMappingURL=scripts.dev.js.map
