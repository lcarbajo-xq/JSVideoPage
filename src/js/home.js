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

      const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
      const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
      const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')

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

      actionList.data.movies.forEach((movie) => {
        debugger
        const HTMLString = videoItemTemplate(movie);
        console.log(HTMLString);
      })

    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');

    const $featuringContainer = document.getElementById('featuring');
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');


    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalImage = $modal.querySelector('img');
    const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');

    })()
