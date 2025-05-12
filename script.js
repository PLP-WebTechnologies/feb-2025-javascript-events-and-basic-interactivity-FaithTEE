document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding tab
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Reset form if going to contact tab
            if (tabId === 'contact') {
                resetActionForm();
            }
        });
    });

    // Dark Mode Toggle
    const colorToggle = document.getElementById('color-toggle');
    colorToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update button text
        colorToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        colorToggle.textContent = 'Toggle Light Mode';
    }

    // Hero Button Click
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.addEventListener('click', () => {
        // Scroll to strategies section
        document.querySelector('[data-tab="strategies"]').click();
    });

    // Accordion Functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const accordionItem = btn.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Stat Card Hover Effects
    function hoverStat(card) {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    }

    function unhoverStat(card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }

    // Image Gallery
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideInterval;

    function showSlide(n) {
        // Wrap around if at end
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Hide all slides and case studies
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        document.querySelectorAll('.case-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show current slide and corresponding case study
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        document.querySelector(`.case-content[data-case="${currentSlide + 1}"]`).classList.add('active');
        document.querySelector(`.case-tab-btn[data-case="${currentSlide + 1}"]`).classList.add('active');
    }

    function changeSlide(n) {
        showSlide(currentSlide + n);
        resetSlideInterval();
    }

    function currentSlide(n) {
        showSlide(n - 1);
        resetSlideInterval();
    }

    // Case study tab buttons
    const caseTabBtns = document.querySelectorAll('.case-tab-btn');
    caseTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const caseNum = btn.getAttribute('data-case');
            
            // Update active tab
            caseTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding case study
            document.querySelectorAll('.case-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.case-content[data-case="${caseNum}"]`).classList.add('active');
            
            // Update gallery slide
            showSlide(parseInt(caseNum) - 1);
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Auto-advance slides
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    startSlideInterval();

    // Pause on hover
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    galleryContainer.addEventListener('mouseleave', () => {
        startSlideInterval();
    });

    // Action Form
    const actionForm = document.getElementById('action-form');
    const formSuccess = document.getElementById('form-success');

    actionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // If form is valid, show success message
        if (isValid) {
            actionForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const actionType = btn.getAttribute('data-action');
            
            // In a real implementation, these would link to actual resources
            switch(actionType) {
                case 'volunteer':
                    alert('Redirecting to volunteer opportunities...\n\nIn a real implementation, this would link to a database of local restoration projects and citizen science programs.');
                    break;
                case 'donate':
                    alert('Redirecting to trusted organizations...\n\nThis would show vetted NGOs working on ocean resilience with transparency reports.');
                    break;
                case 'advocate':
                    alert('Downloading policy toolkit...\n\nThis would provide templates for contacting representatives, key legislation info, and talking points.');
                    break;
            }
        });
    });

    // Reset form
    function resetActionForm() {
        actionForm.reset();
        actionForm.classList.remove('hidden');
        formSuccess.classList.add('hidden');
    }

    // Keypress Detection - Easter Egg
    document.addEventListener('keypress', (e) => {
        if (e.key === 'o') {
            document.body.style.backgroundColor = '#94d2bd';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 300);
        }
    });

    // Initialize first slide and case study
    showSlide(0);
});