document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML += "<p>Loading latest AI news...</p>";

    const realNewsAPI = "https://newsapi.org/v2/everything?q=AI&language=en&sortBy=publishedAt&apiKey=3f6048be17214fe08df5a6144be4c0cd";

    // Alternative Proxy
    const proxy = "https://corsproxy.io/?";

    fetch(proxy + encodeURIComponent(realNewsAPI))
        .then(res => res.json())
        .then(data => {
            if (!data || !data.articles || data.articles.length === 0) {
                throw new Error("No articles found in response.");
            }

            newsContainer.innerHTML = "<h2>Latest AI News</h2>";
            data.articles.slice(0, 3).forEach(article => {
                newsContainer.innerHTML += `
                    <div class="news-item">
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || "No description available."}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error fetching or parsing news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        });
});
