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
  img.src = testimonial.image;
  nameEl.textContent = testimonial.name;
  roleEl.innerHTML = `${testimonial.role} <br><span>${testimonial.company}</span>`;
  quoteEl.textContent = testimonial.text;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function fadeToTestimonial(nextIndex) {
  // Add fade-out
  document.querySelector(".testimonial-card").classList.add("fade-out");

  setTimeout(() => {
    current = nextIndex;
    showTestimonial(current);

    // Remove fade-out to trigger fade-in
    document.querySelector(".testimonial-card").classList.remove("fade-out");
  }, 400); // must match CSS transition
}

nextBtn.addEventListener("click", () => {
  const nextIndex = (current + 1) % testimonials.length;
  fadeToTestimonial(nextIndex);
});

prevBtn.addEventListener("click", () => {
  const nextIndex = (current - 1 + testimonials.length) % testimonials.length;
  fadeToTestimonial(nextIndex);
});

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
