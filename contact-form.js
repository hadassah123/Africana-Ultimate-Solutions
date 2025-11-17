import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded, looking for contact form...");
  
  const contactForm = document.getElementById("contactForm");
  
  if (!contactForm) {
    console.error("ERROR: Contact form with id='contactForm' not found in HTML.");
    return;
  }
  
  console.log("Contact form found. Setting up submit handler...");
  
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted, processing...");
    
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (!fullname || !email || !message) {
      showNotification("error", "Please fill in all required fields (Name, Email, Message).");
      return;
    }
    
    try {
      console.log("Sending to Firebase...", { fullname, email, phone, subject });
      
      const docRef = await addDoc(collection(db, "messages"), {
        fullname,
        email,
        phone,
        subject,
        message,
        createdAt: serverTimestamp(),
      });
      
      console.log("Message saved successfully with ID:", docRef.id);
      showNotification("success", "Your message has been sent! We'll get back to you soon.");
      contactForm.reset();
    } catch (error) {
      console.error("ERROR saving message to Firebase:", error.code, error.message);
      showNotification("error", `Failed to send message: ${error.message}`);
    }
  });
});

// Modern notification system (uses form-notifications.css)
function showNotification(type, message) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".form-notification");
  existingNotifications.forEach(notif => notif.remove());
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `form-notification form-notification--${type}`;
  const icon = type === "success" ? "✓" : "✕";
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icon}</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close" aria-label="Close">×</button>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 10);
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  });
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }
  }, type === "success" ? 5000 : 7000);
}
