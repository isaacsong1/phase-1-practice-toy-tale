let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener('submit', event => handleSubmit(event));
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      console.log("Open form menu");
    } else {
      toyFormContainer.style.display = "none";
      console.log("Close form menu")
    }
  });
});

//! Fetch data and render to page
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(movieObj =>  movieObj.forEach(movie => renderToy(movie)))
  .catch(error => alert(`You ran into this error: ${error.textContent}`))

//! Helper Functions
function renderToy(movie) {
  const div = document.createElement("div");
  div.className = "card";
  const h2 = document.createElement("h2");
  h2.textContent = movie.name;
  const image = document.createElement("img");
  image.className = "toy-avatar";
  image.src = movie.image;
  image.alt = movie.name;
  const likes = document.createElement("p");
  likes.textContent = `${movie.likes} Likes`;
  const btn = document.createElement("button");
  btn.className = "like-btn";
  btn.textContent = "Like ❤️";
  div.append(h2, image, likes, btn);
  document.querySelector("#toy-collection").append(div);
}

