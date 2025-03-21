document.addEventListener("DOMContentLoaded", () => {
  // Function to open a modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  }

  // Function to close a modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.close();
  }

  // Attach event listeners to pricing buttons
  document.querySelectorAll('button[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Attach event listeners to modal close buttons
  document.querySelectorAll('dialog button[data-close]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.closest('dialog').id;
      closeModal(modalId);
    });
  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      alert("Thank you! We'll get back to you soon.");
      this.reset();
    });
  }

  // Fetch and display latest AI news
  const newsContainer = document.getElementById("news");
  if (newsContainer) {
    newsContainer.innerHTML += "<p>Loading latest AI news...</p>";
    const apiKey = "050d73248da7e6e2c1560fb9526d1713"; // Replace with your actual API key
    const apiUrl = `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const fullUrl = proxyUrl + encodeURIComponent(apiUrl);

    fetch(fullUrl)
      .then(res => res.json())
      .then(data => {
        try {
          const parsed = JSON.parse(data.contents);
          newsContainer.innerHTML = "<h2>Latest AI News</h2>";
          parsed.data.forEach(article => {
            newsContainer.innerHTML += `
              <div class="news-item">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || "No description."}</p>
              </div>
            `;
          });
        } catch (err) {
          newsContainer.innerHTML = "<p>Error loading news.</p>";
        }
      })
      .catch(err => {
        newsContainer.innerHTML = "<p>Could not fetch news at this time.</p>";
      });
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});
