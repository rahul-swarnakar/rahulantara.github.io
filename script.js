/* ==========================================
   Responsive Desktop JS for Rahul & Antara
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Hamburger Navigation ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = navToggle ? navToggle.querySelector('i') : null;
            if (icon) icon.className = 'fas fa-bars';
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });


    // --- Active Link Scroll Spy ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 180)) {
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


    // --- Countdown Timer ---
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDateStr = countdownEl.getAttribute('data-date');
        const targetDate = new Date(targetDateStr).getTime();
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetDate - now;
            
            if (difference < 0) {
                clearInterval(intervalId);
                if (countdownEl) {
                    countdownEl.innerHTML = `<h3 style="font-family: var(--font-heading); color: var(--gold-light); font-size: 2rem; width: 100%;">The Celebration Has Begun!</h3>`;
                }
                return;
            }
            
            // Calculations
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);
            
            // Output
            if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
            if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
            if (minutesEl) minutesEl.innerText = m.toString().padStart(2, '0');
            if (secondsEl) secondsEl.innerText = s.toString().padStart(2, '0');
        }
        
        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    }


    // --- Reveal-on-Scroll Observer ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback
        revealElements.forEach(el => el.classList.add('active'));
    }


    // --- Gallery Filter System ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Button Active States
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const isPlaceholder = item.classList.contains('gallery-placeholder');
                
                if (filterValue === 'all') {
                    // Under 'All', show only actual photos (hide Coming Soon placeholders)
                    if (!isPlaceholder) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                } else {
                    // Under specific category, show matching items (can be photo or placeholder card)
                    if (category === filterValue) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                }
            });
        });
    });


    // --- Lightbox Modal Popup ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-item:not(.gallery-placeholder) img');

    if (lightbox && lightboxImg) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer'; // Ensure pointer cursor on images
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                // Trigger transition
                setTimeout(() => lightbox.classList.add('active'), 10);
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption) {
                    lightboxCaption.innerText = img.nextElementSibling ? img.nextElementSibling.innerText : img.alt;
                }
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lightboxCaption) {
                closeLightbox();
            }
        });
    }


    // --- Hero Background Slideshow Loop ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 5000); // Change background every 5 seconds
    }

});
