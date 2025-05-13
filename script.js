// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Formulário de contato
const form = document.querySelector('.contato-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um backend
    
    // Exemplo de feedback visual
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    // Simulando envio
    setTimeout(() => {
        button.textContent = 'Mensagem Enviada!';
        form.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Efeito de digitação na hero
const typerTexts = ['Front End Developer', 'Web Designer'];
const typerElement = document.getElementById('typer');
let typerIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typerTexts[typerIndex];
    if (isDeleting) {
        charIndex--;
        typerElement.textContent = currentText.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            typerIndex = (typerIndex + 1) % typerTexts.length;
            setTimeout(typeEffect, 700);
        } else {
            setTimeout(typeEffect, 40);
        }
    } else {
        charIndex++;
        typerElement.textContent = currentText.substring(0, charIndex);
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
        } else {
            setTimeout(typeEffect, 80);
        }
    }
}

if (typerElement) typeEffect();

// Carrossel de Serviços
const servicosGrid = document.querySelector('.servicos-grid');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let servicoIndex = 0;
let cardsToShow = 3;
let autoplayInterval;

function updateCardsToShow() {
    if (window.innerWidth < 600) {
        cardsToShow = 1;
    } else if (window.innerWidth < 1024) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }
}

function updateCarousel() {
    const cardWidth = servicosGrid.querySelector('.servico-card').offsetWidth + 32; // 32 = gap
    const maxIndex = servicosGrid.children.length - cardsToShow;
    if (servicoIndex < 0) servicoIndex = 0;
    if (servicoIndex > maxIndex) servicoIndex = maxIndex;
    servicosGrid.style.transform = `translateX(-${servicoIndex * cardWidth}px)`;
}

function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
        const maxIndex = servicosGrid.children.length - cardsToShow;
        if (servicoIndex < maxIndex) {
            servicoIndex++;
        } else {
            servicoIndex = 0;
        }
        updateCarousel();
    }, 3000);
}

if (servicosGrid && prevBtn && nextBtn) {
    updateCardsToShow();
    window.addEventListener('resize', () => {
        updateCardsToShow();
        updateCarousel();
    });
    prevBtn.addEventListener('click', () => {
        servicoIndex--;
        updateCarousel();
        startAutoplay();
    });
    nextBtn.addEventListener('click', () => {
        servicoIndex++;
        updateCarousel();
        startAutoplay();
    });
    updateCarousel();
    startAutoplay();
} 