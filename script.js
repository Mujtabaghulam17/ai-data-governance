document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleButton = document.getElementById('theme-toggle');
  const icon = toggleButton.querySelector('i');

  // Function to apply the current theme
  const applyTheme = (theme) => {
    body.classList.toggle('dark-mode', theme === 'dark');
    icon.classList.toggle('fa-sun', theme === 'dark');
    icon.classList.toggle('fa-moon', theme !== 'dark');
    localStorage.setItem('theme', theme);
  };

  // Load the saved theme from localStorage or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDarkScheme ? 'dark' : 'light');
  applyTheme(currentTheme);

  // Toggle dark mode on button click
  toggleButton.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Function to open a modal
  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  };

  // Function to close a modal
  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) modal.close();
  };

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert("Thank you! We'll get back to you soon.");
      this.reset();
    });
  }

  // Fetch and display latest AI news
  const newsContainer = document.getElementById('news');
  if (newsContainer) {
    newsContainer.innerHTML += '<p>Loading latest AI news...</p>';
    const apiKey = '050d73248da7e6e2c1560fb9526d1713'; // Replace with your actual API key
    const apiUrl = `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const fullUrl = proxyUrl + encodeURIComponent(apiUrl);

    fetch(fullUrl)
      .then(res => res.json())
      .then(data => {
        try {
          const parsed = JSON.parse(data.contents);
          newsContainer.innerHTML = '<h2>Latest AI News</h2>';
          parsed.data.forEach(article => {
            newsContainer.innerHTML += `
              <div class="news-item">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || 'No description.'}</p>
              </div>
            `;
          });
        } catch (err) {
          newsContainer.innerHTML = '<p>Error loading news.</p>';
        }
      })
      .catch(err => {
        newsContainer.innerHTML = '<p>Could not fetch news at this time.</p>';
      });
  }
});
