document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchContainer = document.querySelector(".search-container");
  const postList = document.getElementById("post-list"); 

  let allPosts = [];

  const suggestionBox = document.createElement("div");
  suggestionBox.classList.add("search-suggestions");
  searchContainer.appendChild(suggestionBox);

  fetch("/defendthestack/data/posts.json")
    .then((res) => res.json())
    .then((data) => {
      allPosts = data; 
    });

  function showSuggestions(query) {
    suggestionBox.innerHTML = "";
    if (!query) {
      suggestionBox.style.display = "none";
      return;
    }

    const filtered = allPosts.filter((post) => {
      const queryLower = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(queryLower) ||
        post.excerpt.toLowerCase().includes(queryLower) ||
        post.author.toLowerCase().includes(queryLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(queryLower))
      );
    });

    if (filtered.length === 0) {
      suggestionBox.innerHTML = "<p>No results</p>";
      suggestionBox.style.display = "block";
      return;
    }

    filtered.slice(0, 5).forEach((post) => {
      const item = document.createElement("div");
      item.classList.add("suggestion-item");
      item.textContent = post.title;
      item.addEventListener("click", () => {
        window.location.href = `posts/${post.slug}.html`;
      });
      suggestionBox.appendChild(item);
    });

    suggestionBox.style.display = "block";
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    showSuggestions(query);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/defendthestack/search/results.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      suggestionBox.style.display = "none";
    }
  });
});
