// ===================================
//  AURAPRESS CO. - MAIN JAVASCRIPT
//  All Interactive Features
// ===================================

// ===== INITIALIZE AOS =====
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu a');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn?.classList.add('visible');
    } else {
        scrollTopBtn?.classList.remove('visible');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== VIEW TOGGLE =====
const viewButtons = document.querySelectorAll('.view-btn');
const galleryGrid = document.getElementById('galleryGrid');

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const viewType = button.getAttribute('data-view');

        if (viewType === 'list') {
            galleryGrid?.classList.add('list-view');
        } else {
            galleryGrid?.classList.remove('list-view');
        }
    });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');

function openLightbox(element) {
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // You can update lightbox content based on clicked item here
        const itemCard = element.closest('.gallery-item');
        if (itemCard) {
            const title = itemCard.querySelector('.item-title')?.textContent;
            const category = itemCard.querySelector('.item-category')?.textContent;
            const price = itemCard.querySelector('.item-price')?.textContent;

            const lightboxTitle = lightbox.querySelector('.lightbox-title');
            const lightboxCategory = lightbox.querySelector('.lightbox-category');
            const lightboxPrice = lightbox.querySelector('.lightbox-price');

            if (lightboxTitle) lightboxTitle.textContent = title || 'Product Name';
            if (lightboxCategory) lightboxCategory.textContent = category || 'Category';
            if (lightboxPrice) lightboxPrice.textContent = price || 'From $9.99';
        }
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox when clicking outside
lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Show success modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Reset form
    contactForm.reset();

    // Reset file upload label
    const fileLabel = document.getElementById('fileLabel');
    if (fileLabel) {
        fileLabel.textContent = 'Upload Artwork (Optional)';
    }

    // Hide modal after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
});

// ===== FILE UPLOAD LABEL UPDATE =====
function updateFileLabel(input) {
    const fileLabel = document.getElementById('fileLabel');
    if (fileLabel && input.files.length > 0) {
        fileLabel.textContent = input.files[0].name;
    }
}

window.updateFileLabel = updateFileLabel;

// ===== CLOSE MODAL =====
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.closeModal = closeModal;

// ===== CHAT WIDGET =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const quickReplies = document.querySelectorAll('.quick-reply');
const chatBadge = document.querySelector('.chat-badge');

// Toggle chat window
chatToggle?.addEventListener('click', () => {
    chatWindow?.classList.toggle('active');
    if (chatBadge) chatBadge.style.display = 'none';
});

chatClose?.addEventListener('click', () => {
    chatWindow?.classList.remove('active');
});

// Send message function
function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Just now</span>
        </div>
    `;

    chatMessages?.appendChild(userMessage);

    // Clear input
    if (chatInput) chatInput.value = '';

    // Hide quick replies
    const quickRepliesDiv = document.getElementById('quickReplies');
    if (quickRepliesDiv) quickRepliesDiv.style.display = 'none';

    // Scroll to bottom
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Auto-reply after 1 second
    setTimeout(() => {
        addBotMessage(message);
    }, 1000);
}

// Bot auto-reply
function addBotMessage(userMessage) {
    let botResponse = '';

    const msg = userMessage.toLowerCase();

    if (msg.includes('pricing') || msg.includes('price') || msg.includes('cost')) {
        botResponse = "Our pricing varies based on quantity and product type. T-shirts start at $19.99, and we offer bulk discounts. Would you like a custom quote?";
    } else if (msg.includes('turnaround') || msg.includes('time') || msg.includes('how long')) {
        botResponse = "Standard production is 5-7 business days. We also offer rush services (2-3 days) and same-day options for urgent orders!";
    } else if (msg.includes('sample')) {
        botResponse = "We'd be happy to send you samples! Please provide your shipping address and which products you're interested in.";
    } else if (msg.includes('custom') || msg.includes('order')) {
        botResponse = "Great! I can help you start a custom order. What type of product are you interested in? (T-shirts, mugs, promotional items, etc.)";
    } else {
        botResponse = "Thank you for your message! A team member will respond shortly. You can also call us at +1 (555) 123-4567 or email hello@aurapress.co";
    }

    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot';
    botMessage.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${botResponse}</p>
            <span class="message-time">Just now</span>
        </div>
    `;

    chatMessages?.appendChild(botMessage);

    // Scroll to bottom
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Send button click
chatSend?.addEventListener('click', () => {
    const message = chatInput?.value;
    if (message) {
        sendMessage(message);
    }
});

// Enter key to send
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value;
        if (message) {
            sendMessage(message);
        }
    }
});

// Quick replies
quickReplies.forEach(button => {
    button.addEventListener('click', () => {
        const reply = button.getAttribute('data-reply');
        let message = '';

        switch (reply) {
            case 'pricing':
                message = 'What are your pricing options?';
                break;
            case 'turnaround':
                message = 'How long does production take?';
                break;
            case 'samples':
                message = 'Can I request samples?';
                break;
            case 'custom':
                message = 'I want to place a custom order';
                break;
        }

        if (message) {
            sendMessage(message);
        }
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== LOAD MORE FUNCTIONALITY =====
const loadMoreBtns = document.querySelectorAll('.load-more button');

loadMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Simulate loading more items
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {
            btn.innerHTML = 'Load More Items';
            // Here you would typically load more items via AJAX
            alert('More items would be loaded here via AJAX in production!');
        }, 1500);
    });
});

// ===== FORM VALIDATION =====
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.borderColor = 'var(--success-color)';
            }
        });
    });
});

// ===== PREVENT TRANSITIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎨 AuraPress Co. - Professional Sublimation Printing', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cWebsite developed with modern web standards', 'color: #64748b; font-size: 12px;');

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.closeModal = closeModal;
window.updateFileLabel = updateFileLabel;