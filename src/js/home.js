console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@louie_lotoAzul"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien,todoMal) {
  // todoBien();
  setTimeout(function() {
    todoBien('Soy el segundo todo bien');
  }, 5000)
  })

const getUser = new Promise(function(todoBien,todoMal) {
  // todoBien();
  setTimeout(function() {
    todoBien('Soy el primer todo bien');
    }, 3000)
  })

// getUser
//   .catch(function(message) {
//     console.log(message)
//   })

  Promise.all ([
    getUser,
    getUserAll,
  ])
  .then(function(message) {
    console.log(message)
    })
  .catch(function(message) {
    console.log(message)
    })


    $.ajax('https://randomuser.me/api/?results=10', {
    method: 'GET',
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.log(error)
    }
  });

  fetch('https://randomuser.me/api/?results=10')
    .then(function(response) {
    // console.log(response)
      return response.json()
    })
    .then(function(user) {
      console.log(user)
    })
    .catch(function() {
      console.log('ALGO FALLO!')
    });


    (async function load() {
        async function getData (url) {
          const response = await fetch(url);
          const data = await response.json();
          if (data.data.movie_count > 0) {
            return data
          }
          throw new Error('No se encontró ningun resultado');
        }

        async function getDataFriends (url) {
          const response = await fetch(url);
          const data = await response.json();
          if (data.info.results > 0) {
            return data
          }
          throw new Error('No se encontró ningun ususario');
        }

      const $form = document.getElementById('form');
      const $home = document.getElementById('home');
      const $featuringContainer = document.getElementById('featuring');

      function setAttributes ($element, attributes) {
        for (const attribute in attributes) {
          $element.setAttribute(attribute, attributes[attribute])
        }
      }
      const BASE_API = 'https://yts.am/api/v2/';

      function featuringTemplate(peli) {
        return (
          `<div class="featuring">
            <div class="featuring-image">
              <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
            </div>
            <div class="featuring-content">
              <p class="featuring-title">Pelicula encontrada</p>
              <p class="featuring-album">${peli.title}</p>
            </div>
          </div>`
        )
      }


      function friendsTemplate (friend) {
        return (
          `<li class="playlistFriends-item">
            <a href="#">
              <img src="${friend.picture.thumbnail}" alt="echame la culpa" />
              <span>
                ${friend.name.first.toUpperCase()} ${friend.name.last.toUpperCase()}
              </span>
            </a>
          </li>`
        )
      }

        $form.addEventListener('submit', async function(event) {
          event.preventDefault();
          $home.classList.add('search-active');
          const $loader = document.createElement('img');
          setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50,
          })

        $featuringContainer.append($loader);
        const data = new FormData($form);
        // const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        //Puedo deconstruir un objeto oara acceder a un campo dentro del mismo
        //Dentro de 'peli' accedo a 'data' y dentro de data a 'movies' lo puedo expresar adipisicin

        try {
          const {
            data: {
              movies: pelis
            }
          } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
          const HTMLString = featuringTemplate(pelis[0]);
          $featuringContainer.innerHTML = HTMLString;
        } catch (error){
          alert(error.message);
          $loader.remove();
          $home.classList.remove('search-active');
        }
      })

      function videoItemTemplate (movie, category) {
        return (`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
        )
      }

      function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
      }

      const $modal    = document.getElementById('modal');
      const $overlay  = document.getElementById('overlay');

      function findById (list, id){
        return list.find((movie) => {
            return movie.id === parseInt(id, 10)
        })
      }
      function findMovie (id, category) {
        switch (category) {
          case 'action':{
            return findById(actionList, id)
          }
          case 'drama':{
            return findById(dramaList, id)
          }
          default: {
            return findById(animationList, id)
          }
        }
      }

      const $modalImage = $modal.querySelector('img');
      const $modalTitle = $modal.querySelector('h1');
      const $modalDescription = $modal.querySelector('p');

      function showModal($element) {
        debugger;
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        const id = $element.dataset.id;
        const category = $element.dataset.category;
        const data = findMovie(id, category);
        $modalTitle.textContent = data.title;
        $modalImage.setAttribute('src', data.medium_cover_image);
        $modalDescription.textContent = data.description_full;
      }

      const $hideModal = document.getElementById('hide-modal');
      $hideModal.addEventListener('click', hideModal);

      function hideModal() {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards';
      }

      function addEventClick($element) {
        $element.addEventListener('click', function() {
          showModal($element);
        })
      }

      function renderMovieList (list, $container, category) {
        $container.children[0].remove();
        list.forEach((movie) => {
          const HTMLString = videoItemTemplate(movie, category);
          const movieElement = createTemplate(HTMLString);
          $container.append(movieElement);
          const image = movieElement.querySelector('img');
          image.addEventListener('load', (event) => {
            event.srcElement.classList.add('fadeIn');
          })
          addEventClick(movieElement);
        })
      }

      function renderFriendList (list, $container) {
        $container.children[0].remove();
        list.results.forEach((friend) => {
          const HTMLString = friendsTemplate(friend); //friend.name.first
          const friendElement = createTemplate(HTMLString);
          $container.append(friendElement);
          // const image = movieElement.querySelector('img');
          // image.addEventListener('load', (event) => {
          //   event.srcElement.classList.add('fadeIn');
          // })
          // addEventClick(movieElement);
        })
      }

    async function cacheExist(category) {
      const listName = `${category}List`;
      const cacheList = window.localStorage.getItem(listName);
      if (cacheList) {
        return JSON.parse(cacheList);
      } else {

      }
      const {
          data: {
              movies: data
            }
          } = await getData(`${BASE_API}list_movies.json?genre=${category}`);

        window.localStorage.setItem(listName, JSON.stringify(data));
        return data
    }

    const $friendListContainer = document.getElementById("playlistFriends");
    const friendList = await getDataFriends(`https://randomuser.me/api/?results=10`);
    renderFriendList (friendList, $friendListContainer)

    const actionList = await cacheExist('action');
    // window.localStorage.setItem('actionList', JSON.stringify(actionList));
    const $actionContainer = document.querySelector('#action');
    renderMovieList (actionList, $actionContainer, 'action');

    const dramaList = await cacheExist('drama');
    // window.localStorage.setItem('dramaList', JSON.stringify(dramaList));
    const $dramaContainer = document.getElementById('drama');
    renderMovieList (dramaList, $dramaContainer, 'drama');

    const animationList  = await cacheExist('animation');
    // window.localStorage.setItem('animationList', JSON.stringify(animationList));
    const $animationContainer = document.getElementById('animation');
    renderMovieList (animationList, $animationContainer, 'animation');

    })()
