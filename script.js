document.addEventListener('DOMContentLoaded', () => {

// --- 1. Gestion du Menu Burger Mobile ---
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('toggle');

const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true' || false;
        burgerMenu.setAttribute('aria-expanded', !isExpanded);
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('toggle');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });


// --- 2. Animations au Défilement (Scroll Fade-In) ---
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
threshold: 0.15,
rootMargin: "0px 0px -50px 0px"
    };

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
entries.forEach(entry => {
if (!entry.isIntersecting) {
return;
            } else {
entry.target.classList.add('visible');
observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

faders.forEach(fader => {
appearOnScroll.observe(fader);
    });


// --- 3. Pause / Lecture du carrousel héro (accessibilité) ---
const carouselTrack = document.querySelector('.carousel-track');
const carouselToggle = document.getElementById('carouselToggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (carouselTrack && carouselToggle) {
    let isPaused = prefersReducedMotion;

    const updateToggleUI = () => {
        carouselTrack.classList.toggle('paused', isPaused);
        carouselToggle.innerHTML = isPaused
            ? '<span aria-hidden="true">▶</span>'
            : '<span aria-hidden="true">⏸</span>';
        carouselToggle.setAttribute(
            'aria-label',
            isPaused ? 'Reprendre le diaporama' : 'Mettre en pause le diaporama'
        );
    };

    updateToggleUI();

    carouselToggle.addEventListener('click', () => {
        isPaused = !isPaused;
        updateToggleUI();
    });
}
});

// --- 4. Gestion du Formulaire (AJAX) ---
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
contactForm.addEventListener('submit', function(e) {
e.preventDefault(); 

const btnSubmit = this.querySelector('button[type="submit"]');
const originalText = btnSubmit.innerText;

btnSubmit.innerText = "Envoi en cours...";
btnSubmit.style.opacity = "0.7";
btnSubmit.disabled = true;

const formData = new FormData(this);

fetch(this.action, {
method: 'POST',
body: formData,
headers: {
'Accept': 'application/json'
            }
        })
        .then(response => {
if (response.ok) {
this.reset();
btnSubmit.innerText = "Message envoyé avec succès ! 🎉";
btnSubmit.style.backgroundColor = "#4CAF50"; 
            } else {
throw new Error('Erreur réseau');
            }
        })
        .catch(error => {
btnSubmit.innerText = "Erreur lors de l'envoi. Réessayez.";
btnSubmit.style.backgroundColor = "#F44336"; 
        })
        .finally(() => {
setTimeout(() => {
btnSubmit.innerText = originalText;
btnSubmit.style.backgroundColor = "var(--primary-color)";
btnSubmit.style.opacity = "1";
btnSubmit.disabled = false;
            }, 5000);
        });
    });
}