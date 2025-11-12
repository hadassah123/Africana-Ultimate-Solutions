// Testimonials slider
const testimonials = [
  {
    name: "Jane Doe",
    role: "Vice Principal",
    company: "Start-rite Academy",
    image: "assets/1B2A8989.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "John Smith",
    role: "Education Consultant",
    company: "Bright Minds",
    image: "assets/1B2A8989.jpg",
    text: "Africana Ultimate Solutions transformed how our teachers approach learning — the impact has been phenomenal!"
  },
  {
    name: "Sarah Johnson",
    role: "School Director",
    company: "Hilltop Academy",
    image: "assets/1B2A8989.jpg",
    text: "Professional, insightful, and empowering. They helped our staff align with modern education standards effectively."
  }
];

let current = 0;

const img = document.querySelector(".client-img");
const nameEl = document.querySelector(".testimonial-card h4");
const roleEl = document.querySelector(".client-role");
const quoteEl = document.querySelector(".testimonial-quote");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showTestimonial(index) {
  const testimonial = testimonials[index];
  if (!testimonial) return;
  if (img) img.src = testimonial.image;
  if (nameEl) nameEl.textContent = testimonial.name;
  if (roleEl) roleEl.innerHTML = `${testimonial.role} <br><span>${testimonial.company}</span>`;
  if (quoteEl) quoteEl.textContent = testimonial.text;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function fadeToTestimonial(nextIndex) {
  // Add fade-out
  const card = document.querySelector(".testimonial-card");
  if (card) card.classList.add("fade-out");

  setTimeout(() => {
    current = nextIndex;
    showTestimonial(current);

    // Remove fade-out to trigger fade-in
    if (card) card.classList.remove("fade-out");
  }, 400); // must match CSS transition
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const nextIndex = (current + 1) % testimonials.length;
    fadeToTestimonial(nextIndex);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    const nextIndex = (current - 1 + testimonials.length) % testimonials.length;
    fadeToTestimonial(nextIndex);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => fadeToTestimonial(i));
});

// Auto-play (optional)
setInterval(() => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}, 8000); // every 8 seconds

// Initial load
showTestimonial(current);

// -----------------------------
// Mobile navigation (hamburger)
// -----------------------------
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  function closeMenu(){
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('is-open');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    navToggle.classList.toggle('is-open', isOpen);
  });

  // Close menu when a mobile link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

  // -----------------------------
  // Scroll-to-top button
  // -----------------------------
  // Create button element and append to body
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  // Show when scrolled down a bit
  function handleScroll() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll to top (header/nav) when clicked
  scrollBtn.addEventListener('click', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // move focus to the header for accessibility
      header.setAttribute('tabindex', '-1');
      header.focus();
      // remove tabindex after focus to keep DOM clean
      setTimeout(() => header.removeAttribute('tabindex'), 1000);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Allow keyboard activation
  scrollBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollBtn.click();
    }
  });
