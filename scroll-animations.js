// Scroll Animation Effects
// Reveals elements with animations as they come into view

class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Find all elements with animation classes
    this.elements = document.querySelectorAll('[data-animate]');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements
    this.elements.forEach(el => observer.observe(el));
  }

  animateElement(el) {
    const animationType = el.getAttribute('data-animate');
    el.classList.add('animate', `animate-${animationType}`);
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Animate images
  animateImages();
  
  // Animate Africa outline
  animateAfricaOutline();
});

// Image animations - come from sides and fade in
function animateImages() {
  const images = document.querySelectorAll('img:not([data-no-animate])');
  
  images.forEach((img, index) => {
    // Alternate which side images come from
    const fromLeft = index % 2 === 0;
    const animationType = fromLeft ? 'slideInLeft' : 'slideInRight';
    
    // Set initial state
    img.style.opacity = '0';
    img.style.transform = fromLeft ? 'translateX(-50px)' : 'translateX(50px)';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateX(0)';
          }, 100);
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(img);
  });
}

// Animate Africa outline with floating and glow effects
function animateAfricaOutline() {
  const africaImg = document.querySelector('.hero-image img');
  
  if (africaImg) {
    // Add floating animation
    africaImg.style.animation = 'float 3s ease-in-out infinite';
    
    // Add glow effect
    africaImg.style.filter = 'drop-shadow(0 0 20px rgba(43, 114, 56, 0.3))';
    africaImg.style.transition = 'filter 0.3s ease';
    
    // Enhance on hover
    africaImg.addEventListener('mouseenter', () => {
      africaImg.style.filter = 'drop-shadow(0 0 30px rgba(43, 114, 56, 0.6))';
      africaImg.style.transform = 'scale(1.05)';
    });
    
    africaImg.addEventListener('mouseleave', () => {
      africaImg.style.filter = 'drop-shadow(0 0 20px rgba(43, 114, 56, 0.3))';
      africaImg.style.transform = 'scale(1)';
    });
  }
}

// Parallax effect on hero sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const parallaxValue = scrolled * 0.5;
    el.style.transform = `translateY(${parallaxValue}px)`;
  });
});

// Fade in elements on scroll
const observerFadeIn = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Apply fade-in to specific elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.section-title, .blog-card, .service-card, .testimonial-card');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerFadeIn.observe(el);
  });
});

// Count up numbers when they come into view
const observerCountUp = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      if (!isNaN(target)) {
        countUp(entry.target, target);
        entry.target.classList.add('counted');
      }
    }
  });
}, { threshold: 0.5 });

function countUp(element, target) {
  let count = 0;
  const increment = Math.ceil(target / 30);
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.textContent = target;
      clearInterval(interval);
    } else {
      element.textContent = count;
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  const countElements = document.querySelectorAll('[data-count]');
  countElements.forEach(el => observerCountUp.observe(el));
});
