let addToy = false;
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  toyFormContainer.addEventListener('submit', event => handleSubmit(event));
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//! Helper Functions
function renderToy(toy) {
  const div = document.createElement("div");
  div.className = "card";
  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const image = document.createElement("img");
  image.className = "toy-avatar";
  image.src = toy.image;
  image.alt = toy.name;
  const likes = document.createElement("p");
  likes.textContent = `${toy.likes} Likes`;
  const btn = document.createElement("button");
  btn.className = "like-btn";
  btn.id = toy.id;
  btn.textContent = "Like ❤️";
  btn.addEventListener('click', () => {
    toy.likes += 1;
    likes.textContent = `${toy.likes} Likes`;
    updateLikes(toy);
  });
  div.append(h2, image, likes, btn);
  document.querySelector("#toy-collection").append(div);
}


function validateToyData(valuesArr) {
  return valuesArr.every(el => el.trim() !== "");
}

// Might want to add if Toy already exists, then do not create toy
function handleSubmit(event) {
  event.preventDefault();
  if (validateToyData([event.target.name.value, event.target.image.value])) {
    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    }

    renderToy(newToy);

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => {
      if (!resp.ok) {
        alert("There was an error in the response");
      }
    })
    .catch(error => alert(error))

    event.target.reset();
    toyFormContainer.style.display = "none";
  } else {
    alert("You must fill out the boxes!");
  }

}

function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
}

//! Fetch data and render to page
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyObj =>  toyObj.forEach(toy => renderToy(toy)))
  .catch(error => alert(`You ran into this error: ${error.textContent}`))