document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML += "<p>Loading latest AI news...</p>";

    const apiKey = "050d73248da7e6e2c1560fb9526d1713"; // Register on mediastack.com to get this
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.data || data.data.length === 0) {
                throw new Error("No articles found.");
            }

            newsContainer.innerHTML = "<h2>Latest AI News</h2>";
            data.data.forEach(article => {
                newsContainer.innerHTML += `
                    <div class="news-item">
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || "No description."}</p>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Failed to load news:", err);
            newsContainer.innerHTML = "<p>Could not fetch news.</p>";
        });
});
