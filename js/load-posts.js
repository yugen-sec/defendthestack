document.addEventListener("DOMContentLoaded", () => {
  const POSTS_TO_SHOW = 10;

  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("post-list");

      // Sort posts from newest to oldest
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Only take the most recent 10
      const recentPosts = posts.slice(0, POSTS_TO_SHOW);

      recentPosts.forEach(post => {
        const tags = post.tags
          .map(tag => `<a class="tag" href="tags/${encodeURIComponent(tag.toLowerCase())}/index.html">${tag}</a>`)
          .join(" ");

        const html = `
          <div class="post-card">
            <a href="posts/${post.slug}.html">
              <img src="${post.image}" alt="${post.title}" class="post-thumbnail" />
            </a>
            <div class="post-content">
              <h2><a href="posts/${post.slug}.html">${post.title}</a></h2>
              <p class="post-meta">${post.author} • ${new Date(post.date).toLocaleDateString()}</p>
              <p class="post-excerpt">${post.excerpt}</p>
              <div class="post-tags">${tags}</div>
            </div>
          </div>
        `;

        container.innerHTML += html;
      });

      // Add the "View All Posts →" link
      const viewAllLink = document.createElement("div");
      viewAllLink.innerHTML = `<div class="view-all-link"><a href="posts.html">View All Posts →</a></div>`;
      container.appendChild(viewAllLink);
    })
    .catch(err => {
      document.getElementById("post-list").innerHTML = "<p>Failed to load posts.</p>";
      console.error("Error loading posts.json:", err);
    });
});
