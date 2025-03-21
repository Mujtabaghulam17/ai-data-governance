// Function to select a pricing plan and display details
function selectPlan(plan) {
  let planDetails = '';

  switch (plan) {
    case 'Starter':
      planDetails = `
        <h3>Starter Plan - $49/month</h3>
        <ul>
          <li>✔️ Automated Compliance Monitoring</li>
          <li>✔️ GDPR & EU AI Act Ready</li>
          <li>❌ Bias & Drift Detection</li>
          <li>❌ Data Security & Risk Management</li>
          <li>❌ Seamless Integration with ML Tools</li>
        </ul>
        <p>This plan is ideal for small businesses starting with AI data governance.</p>
      `;
      break;
    case 'Professional':
      planDetails = `
        <h3>Professional Plan - $199/month</h3>
        <ul>
          <li>✔️ Automated Compliance Monitoring</li>
          <li>✔️ GDPR & EU AI Act Ready</li>
          <li>✔️ Bias & Drift Detection</li>
          <li>✔️ Data Security & Risk Management</li>
          <li>❌ Seamless Integration with ML Tools</li>
        </ul>
        <p>Perfect for growing businesses needing advanced data governance features.</p>
      `;
      break;
    case 'Enterprise':
      planDetails = `
        <h3>Enterprise Plan - Custom Pricing</h3>
        <ul>
          <li>✔️ Automated Compliance Monitoring</li>
          <li>✔️ GDPR & EU AI Act Ready</li>
          <li>✔️ Bias & Drift Detection</li>
          <li>✔️ Data Security & Risk Management</li>
          <li>✔️ Seamless Integration with ML Tools</li>
        </ul>
        <p>Tailored solutions for large organizations with dedicated support and customization.</p>
      `;
      break;
    default:
      planDetails = '<p>Invalid plan selected.</p>';
  }

  // Display the plan details in a modal
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = planDetails;
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update the toggle button icon
  const themeToggleBtn = document.getElementById('theme-toggle');
  const icon = themeToggleBtn.querySelector('i');
  if (newTheme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Function to apply the saved theme from local storage
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);

  // Set the correct icon on page load
  const themeToggleBtn = document.getElementById('theme-toggle');
  const icon = themeToggleBtn.querySelector('i');
  if (savedTheme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Function to fetch and display the latest AI news
function fetchLatestNews() {
  const newsContainer = document.getElementById('news');
  const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
  const apiUrl = `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        newsContainer.innerHTML = '<h2>Latest AI News</h2>';
        data.data.forEach(article => {
          const newsItem = document.createElement('div');
          newsItem.className = 'news-item';
          newsItem.innerHTML = `
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.description || 'No description available.'}</p>
          `;
          newsContainer.appendChild(newsItem);
        });
      } else {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.innerHTML = '<p>Failed to load news articles.</p>';
    });
}

// Event listener for the dark mode toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

// Apply the saved theme on page load
applySavedTheme();

// Fetch the latest news on page load
fetchLatestNews();

// Event listener for closing the modal
document.getElementById('modal-close').addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside of it
window.addEventListener('click', event => {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
});

// Contact form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Thank you! We'll get back to you soon.");
    this.reset();
  });
} else {
  console.warn("Contact form element with id 'contact-form' not found.");
}
