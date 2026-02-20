// 1. SELECT ELEMENTS
const sections = document.querySelectorAll('.snap-section');
const navLinks = document.querySelectorAll('.nav-link');
const slides = document.querySelectorAll('.slide');

// SMOOTH SCROLL FOR NAV LINKS
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the "pop"
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Scroll the main container to the target section
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 2. INTERSECTION OBSERVER (For Fade-in & Nav Highlight)
const observerOptions = {
    threshold: 0.6 // Trigger when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));

// Slideshow
let slideIndex = 0;
function showSlides() {
    slides.forEach(s => s.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
    setTimeout(showSlides, 3500);
}
if(slides.length) showSlides();