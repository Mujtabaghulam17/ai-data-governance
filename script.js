// Dynamic AI News Section (Fetches latest AI news)
async function loadNews() {
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML = "<p>Loading latest AI news...</p>";

    try {
        const response = await fetch("https://newsapi.org/v2/everything?q=AI&apiKey=3f6048be17214fe08df5a6144be4c0cd");
        const data = await response.json();

        newsContainer.innerHTML = "";
        data.articles.slice(0, 3).forEach(article => {
            let articleHTML = `
                <div class="news-item">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description}</p>
                </div>
            `;
            newsContainer.innerHTML += articleHTML;
        });
    } catch (error) {
        newsContainer.innerHTML = "<p>Failed to load news.</p>";
    }
}

// Pricing Plan Selection
function selectPlan(plan) {
    alert(`You selected the ${plan} plan!`);
}

// Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you! We will get in touch soon.");
    });

    // Load AI News on Page Load
    loadNews();
});
