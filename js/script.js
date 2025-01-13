document.addEventListener("DOMContentLoaded", () => {
  // Script pentru contact form
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Colectează datele din formular
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      try {
        // Trimite datele la server
        const response = await fetch("/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Formular trimis cu succes!");
        } else {
          alert("A apărut o problemă. Încearcă din nou.");
        }
      } catch (error) {
        console.error("Eroare:", error);
        alert("Eroare la conectarea cu serverul.");
      }
    });
  }

  // Script pentru animatie sectiune detalii apartamente
  const buttons = document.querySelectorAll("[data-section]");
  const detailsSections = document.querySelectorAll(".apartment-details");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-section");
      const targetDetails = document.getElementById(targetId);

      detailsSections.forEach((section) => {
        if (section !== targetDetails) {
          section.style.display = "none";
        }
      });

      targetDetails.style.display = "block";
      targetDetails.style.animation = "fadeIn 0.7s ease-in-out";
    });
  });
});
