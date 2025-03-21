document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML += "<p>Loading latest AI news...</p>";

    // 🧠 Replace this with your real API key from mediastack.com
    const apiKey = "050d73248da7e6e2c1560fb9526d1713";
    const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;

    // Use AllOrigins to bypass CORS + HTTPS restriction
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const fullUrl = proxyUrl + encodeURIComponent(apiUrl);

    fetch(fullUrl)
        .then(res => res.json())
        .then(data => {
            const articles = JSON.parse(data.contents).data;
            newsContainer.innerHTML = "<h2>Latest AI News</h2>";
            articles.forEach(article => {
                newsContainer.innerHTML += `
                    <div class="news-item" style="margin-bottom: 20px;">
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || "No description."}</p>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Failed to load news:", err);
            newsContainer.innerHTML = "<p>Could not fetch news. Please try again later.</p>";
        });

    // Pricing plan selection feedback
    window.selectPlan = function (plan) {
        alert(`You selected the ${plan} plan!`);
    };

    // Contact form submission
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you! We'll get back to you soon.");
        this.reset();
    });
});
