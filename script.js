/* ============================================================
   PORTFÓLIO RAFAEL APARECIDO DA SILVA
   JavaScript — Interatividade & Lógica
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Lucide Icons
    lucide.createIcons();

    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const STORAGE_KEY = 'portfolio-theme';

    // Carregar tema salvo ou preferência do sistema
    const currentTheme = localStorage.getItem(STORAGE_KEY) || 
                       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const targetTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem(STORAGE_KEY, targetTheme);
    });

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== MOBILE MENU ====================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==================== TYPING EFFECT ====================
    const typedTextElement = document.getElementById('typedText');
    const words = ["Desenvolvedor em Formação", "Estudante de ADS", "Especialista em Automação", "Analista de Dados"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skill card, trigger progress bars
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animated');
                }
                
                // Trigger stats counter if visible
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== STATS COUNTER ====================
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.textContent);
            const increment = target / 20; // Animation speed

            if (count < target) {
                stat.textContent = Math.ceil(count + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.textContent = target;
            }
        });
    }

    // ==================== BACK TO TOP ====================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== CONTACT FORM ====================
    // Para funcionar de verdade, crie uma conta gratuita no Formspree.io
    // e coloque o seu ID (ex: https://formspree.io/f/xeoqyvzv) no 'action' do formulário ou aqui.
    
    const contactForm = document.getElementById('contactForm');
    const FORMSPREE_URL = 'https://formspree.io/f/SEU_ID_AQUI'; // Substitua pelo seu ID real do Formspree

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            const formData = new FormData(contactForm);
            
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Enviando...';
            btn.disabled = true;
            lucide.createIcons();
            
            // Envio real via Fetch API para o Formspree
            fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    btn.innerHTML = '<i data-lucide="check"></i> Mensagem Enviada!';
                    btn.style.background = '#22c55e';
                    contactForm.reset();
                } else {
                    btn.innerHTML = '<i data-lucide="alert-circle"></i> Erro ao enviar';
                    btn.style.background = '#ef4444';
                }
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 4000);
            }).catch(error => {
                btn.innerHTML = '<i data-lucide="alert-circle"></i> Erro de Rede';
                btn.style.background = '#ef4444';
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 4000);
            });
        });
    }

    // ==================== ACTIVE LINK ON SCROLL ====================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
