function toggleMenu() {
    const menuPanel = document.getElementById('menuPanel');
    menuPanel.classList.toggle('open');
  }
  document.addEventListener("DOMContentLoaded", function() {
      // Get the form and add event listener for form submission
      document.querySelector(".contactForm form").addEventListener("submit", function(event) {
          event.preventDefault(); // Prevent form submission

          // Show the alert message
          alert("Thank you for your message. We will get back to you soon!");

          // Clear the form fields
          var form = document.querySelector(".contactForm form");
          form.reset();
      });
  });    