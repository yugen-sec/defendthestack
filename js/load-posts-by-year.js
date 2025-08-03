document.addEventListener("DOMContentLoaded", () => {
  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("post-list-by-year");

      // Group posts by year
      const grouped = {};
      posts.forEach(post => {
        const year = new Date(post.date).getFullYear();
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(post);
      });

      // Sort years descending
      const years = Object.keys(grouped).sort((a, b) => b - a);

      years.forEach(year => {
        // Sort posts by date descending within the year
        grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date));

        const yearBlock = document.createElement("section");
        yearBlock.innerHTML = `<h2 style="margin-top: 2rem;">${year}</h2><ul class="post-year-list"></ul>`;
        const ul = yearBlock.querySelector("ul");

        grouped[year].forEach(post => {
          const li = document.createElement("li");
          li.innerHTML = `
            <a href="posts/${post.slug}.html">${post.title}</a>
            <span class="post-date">${new Date(post.date).toLocaleDateString(undefined, {
              month: "2-digit", day: "2-digit"
            })}</span>
          `;
          ul.appendChild(li);
        });

        container.appendChild(yearBlock);
      });
    })
    .catch(err => {
      console.error("Error loading posts by year:", err);
      document.getElementById("post-list-by-year").innerHTML = "<p>Failed to load posts.</p>";
    });
});
