// Função aprimorada para transição suave entre seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    // Primeiro, aplicamos fade-out a todas as seções ativas
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.classList.add('fade-out');
            
            // Esperamos a animação terminar antes de esconder a seção
            setTimeout(() => {
                section.classList.remove('active');
                section.classList.remove('fade-out');
                
                // Após esconder a seção anterior, mostramos a nova com animação
                const targetSection = document.getElementById(`${sectionId}-section`);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.classList.add('fade-in');
                    
                    // Removemos a classe de animação após ela terminar
                    setTimeout(() => {
                        targetSection.classList.remove('fade-in');
                    }, 500);
                }
            }, 300);
        } else if (!document.querySelector('.content-section.active')) {
            // Caso não haja seção ativa (primeira carga)
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.classList.add('fade-in');
                
                setTimeout(() => {
                    targetSection.classList.remove('fade-in');
                }, 500);
            }
        }
    });
}

// Navegação com teclado
document.addEventListener('keydown', function(event) {
    const buttons = document.querySelectorAll('.nav-button');
    const currentIndex = Array.from(buttons).findIndex(button => button === document.activeElement);
    
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        if (currentIndex > 0) {
            buttons[currentIndex - 1].focus();
        } else {
            buttons[buttons.length - 1].focus();
        }
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        if (currentIndex < buttons.length - 1 && currentIndex !== -1) {
            buttons[currentIndex + 1].focus();
        } else {
            buttons[0].focus();
        }
    }
});

// Efeito Matrix no fundo
window.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('matrix').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Caracteres para o efeito Matrix
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const matrixChars = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    // Array para guardar a posição Y de cada coluna
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Função para desenhar a "chuva" de caracteres
    function drawMatrix() {
        ctx.fillStyle = "rgba(15, 15, 26, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#50fa7b";
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            // Pega um caractere aleatório
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            
            // Desenha o caractere
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Adiciona probabilidade aleatória para resetar a posição
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move para baixo
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    // Foca no primeiro botão quando a página carrega
    document.querySelector('.nav-button').focus();
}

// Tela de carregamento
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercent = document.getElementById('loading-percent');

    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10; // Incrementa o progresso aleatoriamente
        if (progress >= 100) {
            progress = 100; // Garante que o progresso não ultrapasse 100%
            clearInterval(loadingInterval); // Para o intervalo quando atingir 100%

            // Oculta a tela de carregamento
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }

        // Atualiza a barra de carregamento e o texto
        loadingBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${Math.round(progress)}%`;
    }, 200); // Atualiza a cada 200ms
});

// Adiciona efeito de hover aos nós da árvore de habilidades
document.addEventListener('DOMContentLoaded', function() {
// Verifica se os elementos existem para evitar erros
if (document.querySelector('.skill-tree')) {
const skillNodes = document.querySelectorAll('.skill-node');

skillNodes.forEach(node => {
    node.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 8px rgba(189, 147, 249, 0.7)';
        }
    });
    
    node.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        }
    });
});
}

// Adiciona efeito de progresso nas barras de estatísticas
const statBars = document.querySelectorAll('.stat-bar-fill');

statBars.forEach(bar => {
const originalWidth = bar.style.width;
bar.style.width = '0%';

setTimeout(() => {
    bar.style.transition = 'width 1s ease-out';
    bar.style.width = originalWidth;
}, 300);
});
});

// Adiciona classe 'active-nav' ao botão de navegação atual
function updateActiveNav() {
const navButtons = document.querySelectorAll('.nav-button');

navButtons.forEach(button => {
button.addEventListener('click', function() {
    navButtons.forEach(btn => btn.classList.remove('active-nav'));
    this.classList.add('active-nav');
});
});
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', function() {
// Aplica estilo ao botão de navegação atual
updateActiveNav();

// Adiciona a classe CSS para destacar botões de navegação ativos
const style = document.createElement('style');
style.textContent = `
.nav-button.active-nav {
    background-color: var(--button-hover);
    box-shadow: 0 0 10px rgba(80, 250, 123, 0.5);
    transform: translateY(-2px);
}
`;
document.head.appendChild(style);
});