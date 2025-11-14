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
      alert("Please fill in all required fields (Name, Email, Message).");
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
      alert("Your message has been sent! We'll get back to you soon.");
      contactForm.reset();
    } catch (error) {
      console.error("ERROR saving message to Firebase:", error.code, error.message);
      alert(`Failed to send message: ${error.message}`);
    }
  });
});
