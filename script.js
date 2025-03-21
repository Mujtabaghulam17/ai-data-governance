document.addEventListener("DOMContentLoaded", () => {
    // Check if the news container exists
    const newsContainer = document.getElementById("news");
    if (newsContainer) {
        newsContainer.innerHTML += "<p>Loading latest AI news...</p>";

        // 🧠 Replace this with your real API key from mediastack.com
        const apiKey = "050d73248da7e6e2c1560fb9526d1713";
        // Use HTTPS instead of HTTP to avoid mixed content issues
        const apiUrl = `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;

        // Use AllOrigins to bypass CORS + HTTPS restrictions
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const fullUrl = proxyUrl + encodeURIComponent(apiUrl);

        fetch(fullUrl)
            .then(res => res.json())
            .then(data => {
                try {
                    const parsedData = JSON.parse(data.contents);
                    const articles = parsedData.data;
                    newsContainer.innerHTML = "<h2>Latest AI News</h2>";
                    articles.forEach(article => {
                        newsContainer.innerHTML += `
                            <div class="news-item" style="margin-bottom: 20px;">
                                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                                <p>${article.description || "No description."}</p>
                            </div>
                        `;
                    });
                } catch (e) {
                    console.error("Error parsing news data:", e);
                    newsContainer.innerHTML = "<p>Error processing news data. Please try again later.</p>";
                }
            })
            .catch(err => {
                console.error("Failed to load news:", err);
                newsContainer.innerHTML = "<p>Could not fetch news. Please try again later.</p>";
            });
    } else {
        console.warn("News container element with id 'news' not found.");
    }

    // Pricing plan selection feedback
    window.selectPlan = function (plan) {
        alert(`You selected the ${plan} plan!`);
    };

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you! We'll get back to you soon.");
            this.reset();
        });
    } else {
        console.warn("Contact form element with id 'contact-form' not found.");
    }
});
