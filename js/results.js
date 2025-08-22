document.addEventListener("DOMContentLoaded", () => {
  const resultsList = document.getElementById("results-list");
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  fetch("../data/posts.json")
    .then((res) => res.json())
    .then((allPosts) => {
      const filtered = allPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );

      if (filtered.length === 0) {
        resultsList.innerHTML = `<p>No results found for "<strong>${query}</strong>"</p>`;
        return;
      }

      filtered.forEach((post) => {
        const url = `../posts/${post.slug}.html`;
        const card = document.createElement("article");
        card.classList.add("post-card");
        card.innerHTML = `
          <a href="${url}">
            <img src="../${post.image}" alt="${post.title}" class="post-thumbnail" />
          </a>
          <div class="post-content">
            <h2><a href="${url}">${post.title}</a></h2>
            <p class="post-meta">By ${post.author} • ${new Date(post.date).toLocaleDateString()}</p>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-tags">
              ${post.tags.map((tag) => `<a href="../tags.html?tag=${tag}" class="tag">${tag}</a>`).join(" ")}
            </div>
          </div>
        `;
        resultsList.appendChild(card);
      });
    });
});
