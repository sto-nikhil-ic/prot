// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
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

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .skill-category, .portfolio-item, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
const skillCategories = document.querySelectorAll('.skill-category');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'all 0.6s ease';
    skillsObserver.observe(category);
});

// Add hover effect to portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #667eea;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        z-index: 10000;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Art Modal Functionality
const artLink = document.getElementById("art-link") // You need to add this ID to your art navigation link
const artModal = document.getElementById("art-modal")
const artClose = document.querySelector(".art-close")
const artCategoryBtns = document.querySelectorAll(".art-category-btn")
const artGalleries = document.querySelectorAll(".art-gallery")
const artItems = document.querySelectorAll(".art-item")
const artLightbox = document.getElementById("art-lightbox")
const lightboxClose = document.querySelector(".lightbox-close")
const lightboxImage = document.getElementById("lightbox-image")
const lightboxTitle = document.getElementById("lightbox-title")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

let currentImageIndex = 0
let currentGalleryItems = []

// Open art modal
artLink.addEventListener("click", (e) => {
  e.preventDefault()
  artModal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Trigger staggered animation for art items
  setTimeout(() => {
    const activeGallery = document.querySelector(".art-gallery.active")
    const items = activeGallery.querySelectorAll(".art-item")
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
    })
  }, 100)
})

// Close art modal
artClose.addEventListener("click", () => {
  artModal.classList.remove("active")
  document.body.style.overflow = "auto"
})

// Close modal when clicking outside
artModal.addEventListener("click", (e) => {
  if (e.target === artModal) {
    artModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Art category switching
artCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and galleries
    artCategoryBtns.forEach((b) => b.classList.remove("active"))
    artGalleries.forEach((g) => g.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Show corresponding gallery
    const category = btn.getAttribute("data-category")
    const targetGallery = document.getElementById(`${category}-gallery`)
    targetGallery.classList.add("active")

    // Reset and trigger staggered animation
    const items = targetGallery.querySelectorAll(".art-item")
    items.forEach((item, index) => {
      item.style.animation = "none"
      item.offsetHeight // Trigger reflow
      item.style.animation = `fadeInScale 0.6s ease forwards`
      item.style.animationDelay = `${index * 0.1}s`
    })
  })
})

// Art item click handlers for lightbox
artItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    const title = item.getAttribute("data-title")
    const description = item.getAttribute("data-description")

    // Get current gallery items for navigation
    const activeGallery = item.closest(".art-gallery")
    currentGalleryItems = Array.from(activeGallery.querySelectorAll(".art-item"))
    currentImageIndex = currentGalleryItems.indexOf(item)

    // Set lightbox content
    lightboxImage.src = img.src
    lightboxImage.alt = img.alt
    lightboxTitle.textContent = title
    lightboxDescription.textContent = description

    // Show lightbox
    artLightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  })
})

// Close lightbox
lightboxClose.addEventListener("click", () => {
  artLightbox.classList.remove("active")
  document.body.style.overflow = "hidden" // Keep modal scroll disabled
})

// Close lightbox when clicking outside
artLightbox.addEventListener("click", (e) => {
  if (e.target === artLightbox) {
    artLightbox.classList.remove("active")
    document.body.style.overflow = "hidden" // Keep modal scroll disabled
  }
})

// Lightbox navigation
lightboxPrev.addEventListener("click", () => {
  currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentGalleryItems.length - 1
  updateLightboxContent()
})

lightboxNext.addEventListener("click", () => {
  currentImageIndex = currentImageIndex < currentGalleryItems.length - 1 ? currentImageIndex + 1 : 0
  updateLightboxContent()
})

// Update lightbox content
function updateLightboxContent() {
  const currentItem = currentGalleryItems[currentImageIndex]
  const img = currentItem.querySelector("img")
  const title = currentItem.getAttribute("data-title")
  const description = currentItem.getAttribute("data-description")

  lightboxImage.style.opacity = "0"
  setTimeout(() => {
    lightboxImage.src = img.src
    lightboxImage.alt = img.alt
    lightboxTitle.textContent = title
    lightboxDescription.textContent = description
    lightboxImage.style.opacity = "1"
  }, 150)
}

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (artLightbox.classList.contains("active")) {
    if (e.key === "Escape") {
      artLightbox.classList.remove("active")
      document.body.style.overflow = "hidden" // Keep modal scroll disabled
    } else if (e.key === "ArrowLeft") {
      lightboxPrev.click()
    } else if (e.key === "ArrowRight") {
      lightboxNext.click()
    }
  }

  if (artModal.classList.contains("active") && e.key === "Escape") {
    artModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Add smooth transitions for image loading
artItems.forEach((item) => {
  const img = item.querySelector("img")
  img.addEventListener("load", () => {
    img.style.opacity = "1"
  })
  img.style.opacity = "0"
  img.style.transition = "opacity 0.3s ease"
})

// Add hover effects
artItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-5px) scale(1.02)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)"
  })
})

// Lazy loading for art images (performance optimization)
const artImageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      if (img.dataset.src) {
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        artImageObserver.unobserve(img)
      }
    }
  })
})

// Observe all art images for lazy loading
document.querySelectorAll(".art-item img").forEach((img) => {
  artImageObserver.observe(img)
})
