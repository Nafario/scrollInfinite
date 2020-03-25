const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;
// fetch post
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&page=${page}`
  );

  const data = await res.json();

  return data;
}

// show post on dom
async function showPost() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;

    postContainer.appendChild(postEl);
  });
}
function showLoading() {
    loading.style.opacity ="1"

  setTimeout(() => {
    loading.style.opacity ="0"

    setTimeout(() => {
      page++;
      showPost();
    }, 200);
  }, 900);
}

// filter post

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > - 1 || body.indexOf(term) > - 1)  {
        post.style.display = "flex"
    } else{
      post.style.display = "none"
    }
  });
  
}

showPost();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
