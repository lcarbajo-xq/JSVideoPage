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


    $.ajax('https://randomuser.me/api/', {
    method: 'GET',
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.log(error)
    }
  });

  fetch('https://randomuser.me/api')
    .then(function(response) {
    // console.log(response)
      return response.json()
    })
    .then(function(user) {
      console.log('user', user.results[0].name.first)
    })
    .catch(function() {
      console.log('ALGO FALLO!')
    });


    (async function load() {
        async function getData (url) {
          const response = await fetch(url);
          const data = await response.json()
          return data
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
        const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        const HTMLString = featuringTemplate(peli.data.movies[0]);
        $featuringContainer.innerHTML = HTMLString;
      })

      const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
      const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
      const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)

      function videoItemTemplate (movie) {
        return (`<div class="primaryPlaylistItem">
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

      function showModal() {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
      }

      const $hideModal = document.getElementById('hide-modal');
      $hideModal.addEventListener('click', hideModal);

      function hideModal() {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards';
      }

      function addEventClick($element) {
        $element.addEventListener('click', function() {
          showModal();
        })
      }

      function renderMovieList (list, $container) {
        $container.children[0].remove();
        list.forEach((movie) => {
          const HTMLString = videoItemTemplate(movie);
          const movieElement = createTemplate(HTMLString);
          $container.append(movieElement)
          addEventClick(movieElement);
        })
      }

    const $actionContainer = document.querySelector('#action');
    renderMovieList (actionList.data.movies, $actionContainer);

    const $dramaContainer = document.getElementById('drama');
    renderMovieList (dramaList.data.movies, $dramaContainer);

    const $animationContainer = document.getElementById('animation');
    renderMovieList (animationList.data.movies, $animationContainer);

    const $modalImage = $modal.querySelector('img');
    const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');

    })()
