document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML = "<p>Loading latest AI news...</p>";

    const apiKey = "050d73248da7e6e2c1560fb9526d1713"; // Replace with your Mediastack API key
    const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=AI&languages=en&sort=published_desc&limit=5`;

    // Use corsproxy.io to bypass CORS restrictions
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                newsContainer.innerHTML = "<h2>Latest AI News</h2>";
                data.data.forEach(article => {
                    newsContainer.innerHTML += `
                        <div class="news-item">
                            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                            <p>${article.description || "No description available."}</p>
                        </div>
                    `;
                });
            } else {
                newsContainer.innerHTML = "<p>No news articles found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        });
    function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

});
