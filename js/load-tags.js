document.addEventListener("DOMContentLoaded", () => {
  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      const tagsContainer = document.getElementById("tags-list");
      const uniqueTags = new Set();

      posts.forEach(post => {
        post.tags.forEach(tag => uniqueTags.add(tag));
      });

      if (uniqueTags.size === 0) {
        tagsContainer.innerHTML = "<p>No tags found.</p>";
        return;
      }

      uniqueTags.forEach(tag => {
        const tagLink = document.createElement("a");
        tagLink.href = `tags/${encodeURIComponent(tag.toLowerCase())}/index.html`;
        tagLink.className = "tag-link";
        tagLink.textContent = tag;
        tagsContainer.appendChild(tagLink);
      });
    })
    .catch(err => {
      console.error("Error loading posts.json for tags:", err);
      document.getElementById("tags-list").innerHTML = "<p>Failed to load tags.</p>";
    });
});