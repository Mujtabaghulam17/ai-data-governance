const newsContainer = document.getElementById("news");

async function loadNews() {
    newsContainer.innerHTML += "<p>Loading latest AI news...</p>";

    const url = `https://newsapi.org/v2/everything?q=AI&language=en&sortBy=publishedAt&apiKey=3f6048be17214fe08df5a6144be4c0cd`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const articles = JSON.parse(data.contents).articles;

        newsContainer.innerHTML = "<h2>Latest AI News</h2>";
        articles.slice(0, 3).forEach(article => {
            newsContainer.innerHTML += `
                <div class="news-item">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description || ""}</p>
                </div>
            `;
        });
    } catch (error) {
        newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        console.error("News fetch error:", error);
    }
}

// Pricing Plan Selection
function selectPlan(plan) {
    alert(`You selected the ${plan} plan!`);
}

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you! We will get in touch soon.");
    });

    loadNews();
});
