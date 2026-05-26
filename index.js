// ===== INITIALIZE AOS =====
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// ===== VARIABLES =====
const tshirt = document.getElementById('tshirt');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const progressBar = document.getElementById('progressBar');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');

let hasUnfolded = false;

// ===== T-SHIRT UNFOLD ANIMATION =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100 && !hasUnfolded) {
        tshirt.classList.remove('folded');
        tshirt.classList.add('unfolded');
        hasUnfolded = true;
    }
});

// ===== MOBILE MENU TOGGLE =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== PROGRESS BAR ON SCROLL =====
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FILE UPLOAD NAME DISPLAY =====
function updateFileName(input) {
    const fileName = input.files[0]?.name || 'AI, EPS, PDF, PSD, PNG, JPG (Max 10MB)';
    document.getElementById('fileName').textContent = fileName;
}

// ===== CONTACT FORM SUBMISSION =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.style.animation = 'fadeIn 0.3s ease';
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4" style="animation: scaleIn 0.5s ease;">
            <div class="text-center">
                <div class="w-20 h-20 gradient-aurora rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-4xl text-white"></i>
                </div>
                <h3 class="text-2xl font-heading font-bold mb-2">Message Sent!</h3>
                <p class="text-gray-text mb-6">Thank you for contacting AuraPress Co. We'll get back to you within 24 hours.</p>
                <button onclick="this.closest('.fixed').remove()" class="gradient-aurora text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Reset form
    contactForm.reset();
    document.getElementById('fileName').textContent = 'AI, EPS, PDF, PSD, PNG, JPG (Max 10MB)';
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== KEYFRAME ANIMATIONS FOR MODAL =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);