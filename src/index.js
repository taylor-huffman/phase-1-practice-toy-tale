let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById('toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('form')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  form.addEventListener('submit', submitHandler)

  function renderToy(object) {
    let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let button = document.createElement('button')
      div.classList.add('card')
      h2.textContent = object.name
      img.src = object.image
      img.classList.add('toy-avatar')
      if (object.likes > 1 || object.likes === 0) {
        p.textContent = `${object.likes} Likes`
      } else {
        p.textContent = `${object.likes} Like`
      }
      button.classList.add('like-btn')
      button.id = object.id
      button.textContent = 'Like ❤️'
      button.addEventListener('click', () => {
        if (object.likes === 0) {
          p.textContent = `${object.likes+=1} Like`
        } else {
          p.textContent = `${object.likes+=1} Likes`
        }
        updateLikeCount(object)
      })
      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)
      toyCollection.appendChild(div)
  }

  // function addLikes() {
  //   alert('more likes')
  // }

  const getAllToys = () => {
    fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let toy in data) {
      let toyData = data[toy]
      renderToy(toyData)
    }
  });
  }

  const postToy = (toyObj) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

  const updateLikeCount = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

  function initialize() {
    getAllToys()
  }
  initialize()

  function submitHandler(e) {
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }
    if (form.name.value === '' || form.image.value === '') {
      alert('Wait! Make sure you have entered a name and image URL!')
      form.reset()
    } else {
      renderToy(toyObj)
      postToy(toyObj)
      form.reset()
    }
    }
  });
