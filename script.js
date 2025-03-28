// Header scroll effect com parallax
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Efeito parallax no header
    header.style.transform = `translateY(${currentScroll * 0.1}px)`;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Efeito de digitação no texto
const typingText = document.querySelector('.typing-text');
const texts = ['Desenvolvedor Web Full Stack', 'Designer UI/UX', 'Criador de Experiências Digitais'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

type();

// Smooth scroll com offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Animação de scroll para elementos com parallax
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Efeito parallax nas imagens
            const images = entry.target.querySelectorAll('img');
            images.forEach(img => {
                img.style.transform = `translateY(${entry.intersectionRatio * 20}px)`;
            });
            
            // Animação dos elementos filhos
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
    Array.from(section.children).forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'all 0.6s ease-out';
    });
});

// Formulário de contato com validação e animação
const formularioContato = document.getElementById('formulario-contato');
const inputs = formularioContato.querySelectorAll('input, textarea');

inputs.forEach(input => {
    // Adiciona labels flutuantes
    const label = document.createElement('label');
    label.textContent = input.placeholder;
    input.parentElement.appendChild(label);
    
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
            label.classList.remove('active');
        }
    });
    
    // Validação em tempo real
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const value = input.value;
    const parent = input.parentElement;
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            parent.classList.add('valid');
            parent.classList.remove('invalid');
        } else {
            parent.classList.add('invalid');
            parent.classList.remove('valid');
        }
    }
}

formularioContato.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animação do botão
    const button = this.querySelector('button');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // Simulação de envio com animação
    button.disabled = true;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            formularioContato.reset();
        }, 2000);
    }, 1500);
});

// Função para adicionar projetos com animação
function adicionarProjeto(titulo, descricao, imagem, link) {
    const projetosGrid = document.querySelector('.projetos-grid');
    const projeto = document.createElement('div');
    projeto.className = 'projeto';
    projeto.style.opacity = '0';
    projeto.style.transform = 'translateY(20px)';
    
    projeto.innerHTML = `
        <div class="projeto-imagem">
            <img src="${imagem}" alt="${titulo}">
            <div class="projeto-overlay">
                <a href="${link}" target="_blank" class="btn-projeto">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
        <div class="projeto-conteudo">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
        </div>
    `;
    
    projetosGrid.appendChild(projeto);
    
    setTimeout(() => {
        projeto.style.transition = 'all 0.6s ease-out';
        projeto.style.opacity = '1';
        projeto.style.transform = 'translateY(0)';
    }, 100);
}

// Projetos com efeito de hover
const projetos = [
    {
        titulo: 'Sistema de Gestão 3D',
        descricao: 'Sistema completo para gestão empresarial com módulos integrados e interface 3D',
        imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        link: '#'
    },
    {
        titulo: 'E-commerce Premium 3D',
        descricao: 'Loja virtual com sistema de pagamentos e gestão de produtos em ambiente 3D',
        imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        link: '#'
    },
    {
        titulo: 'App Mobile 3D',
        descricao: 'Aplicativo mobile com interface moderna e experiência fluida em 3D',
        imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        link: '#'
    }
];

// Adicionar projetos com delay e efeito de cascata
projetos.forEach((projeto, index) => {
    setTimeout(() => {
        adicionarProjeto(
            projeto.titulo,
            projeto.descricao,
            projeto.imagem,
            projeto.link
        );
    }, index * 200);
}); 