document.addEventListener("DOMContentLoaded", () => {
  const rawTag = window.location.pathname.split("/")[2];
  const currentTag = decodeURIComponent(rawTag).toLowerCase();

  fetch("../../data/posts.json")
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("post-list");
      const filteredPosts = posts.filter(post =>
        post.tags.some(tag => tag.toLowerCase() === currentTag)
      );

      if (filteredPosts.length === 0) {
        document.getElementById("tag-title").textContent = `Posts Tagged: ${rawTag}`;
        container.innerHTML = "<p>No posts found for this tag.</p>";
        return;
      }

      
      const originalTag = filteredPosts[0].tags.find(tag => tag.toLowerCase() === currentTag);

      document.getElementById("tag-title").textContent = `Posts Tagged: ${originalTag}`;

      filteredPosts.forEach(post => {
        const tagsHtml = post.tags
          .map(t => `<a class="tag" href="../${encodeURIComponent(t.toLowerCase())}/index.html">${t}</a>`)
          .join(" ");
        const html = `
          <div class="post-card">
            <a href="../../posts/${post.slug}.html">
              <img src="../../${post.image}" alt="${post.title}" class="post-thumbnail" />
            </a>
            <div class="post-content">
              <h2><a href="../../posts/${post.slug}.html">${post.title}</a></h2>
              <p class="post-meta">${post.author} • ${new Date(post.date).toLocaleDateString()}</p>
              <p class="post-excerpt">${post.excerpt}</p>
              <div class="post-tags">${tagsHtml}</div>
            </div>
          </div>
        `;
        container.innerHTML += html;
      });
    })
    .catch(err => {
      console.error("Error loading posts for tag page:", err);
      document.getElementById("post-list").innerHTML = "<p>Failed to load posts for this tag.</p>";
    });
});
