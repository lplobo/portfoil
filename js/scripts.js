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
    // Check if the user is typing in a form input
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        return; // Don't handle navigation if typing in form
    }

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

// Inicializa o sistema de partículas quando a página carregar
createParticleSystem();

// Gerenciamento do tema
initThemeToggle();

// Inicializa o parallax quando o DOM estiver carregado
initParallax();
});

// Sistema de partículas interativas
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Ajusta o tamanho do canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Atualiza a posição do mouse
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Classe para partículas
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(189, 147, 249, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            // Movimento suave em direção ao mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                this.speedX -= Math.cos(angle) * force * 0.2;
                this.speedY -= Math.sin(angle) * force * 0.2;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Reduz a velocidade gradualmente
            this.speedX *= 0.98;
            this.speedY *= 0.98;

            // Reseta a partícula se sair da tela
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Cria as partículas iniciais
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Efeito de digitação para títulos
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplica o efeito de digitação aos títulos principais
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const originalText = title.textContent;
        typeWriter(title, originalText);
    });
    
    // ... existing code ...
});

// Gerenciamento do tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verifica se há um tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Atualiza o tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Atualiza o ícone com animação
        updateThemeIcon(newTheme);
        
        // Adiciona efeito de transição
        document.body.style.transition = 'background-color 0.3s ease';
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Efeito Parallax
function initParallax() {
    // Cria o container de parallax
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-container';
    
    // Cria as camadas de parallax
    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `parallax-layer parallax-layer-${i}`;
        parallaxContainer.appendChild(layer);
    }
    
    // Adiciona o container ao body
    document.body.insertBefore(parallaxContainer, document.body.firstChild);
    
    // Função para atualizar o parallax
    function updateParallax(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Atualiza cada camada com diferentes velocidades
        document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
            const speed = (index + 1) * 0.05;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            layer.style.transform = `translate(${x}px, ${y}px) translateZ(-${index + 1}px) scale(2)`;
        });
        
        // Atualiza elementos do conteúdo
        const elements = document.querySelectorAll('.game-container, .sidebar, .main-content, .profile-card, .project-card, .experience-item, .education-item');
        elements.forEach(element => {
            const speed = 0.02;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            element.style.transform = `translate(${x}px, ${y}px) translateZ(0)`;
        });
    }
    
    // Adiciona o evento de movimento do mouse
    document.addEventListener('mousemove', updateParallax);
    
    // Atualiza o parallax no redimensionamento da janela
    window.addEventListener('resize', () => {
        const e = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
        updateParallax(e);
    });
    
    // Inicializa o parallax com a posição central
    const e = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
    updateParallax(e);
}