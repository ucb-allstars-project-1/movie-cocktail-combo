//Start of the Code By SI

const movieTitleInputEl = document.querySelector('#movie-title');
const movieFormEl = document.querySelector('#movie-form');
const drinkImgEl = document.querySelector('#drink-img');
const genres = ["Action", "Horror", "Sci-Fi", "Animation", "Adventure", "Comedy", "Family", "Short", "Drama", "Romance"];

const currentMovie = {};
const similarMovies = [];

let ordinaryDrinksList;

//Return a number between min and max-1
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//It returns an index randomly by genre
function getRandomDrinkByGenre(genre) {
  let quantityOfDrinkPerGenre = Math.floor(ordinaryDrinksList.length / genres.length);

  let genreIndex = genres.indexOf(genre);
  genreIndex = (genreIndex == -1) ? 0 : genreIndex;
  let indexInit = (quantityOfDrinkPerGenre * genreIndex);

  let indexEnd = indexInit + quantityOfDrinkPerGenre - 1;
  let drinkIndex = getRandomArbitrary(indexInit, indexEnd);
  return ordinaryDrinksList[drinkIndex];
}

function printRandomDrinks() {
  genres.forEach(element => {
    let randomDrink = getRandomDrinkByGenre(element);
    console.log("Genre: " + element + " Drink:" + randomDrink.strDrink);
  });
}

//Fill the oridinaryDrinksList with an array of ordinary drinks from thecocktail API
function getOrdinaryDrinks() {
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          ordinaryDrinksList = data.drinks;
          //The next line has to be deleted
          printRandomDrinks();
        })
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to the Cocktaildb.com');
    });
};


function getFirstGenre(data) {

  let genre = data.Genre.split(',');
  genre = Array.isArray(genre) ? data.Genre.split(',')[0] : genre;

  return data.Genre.split(',')[0];
}


// Reads movies from local storage and returns array of movies objects.
// Returns an empty array ([]) if there aren't any movies.
function readSearchedMoviesFromStorage() {
  var movies = localStorage.getItem('movies');
  if (movies) {
    movies = JSON.parse(movies);
  } else {
    movies = [];
  }
  return movies;
}

// Takes an array of movies and saves them in localStorage.
function saveSearchedMoviesToStorage(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
}


//This function get a ramdom Drink by the movie title that was input by the user in the form
let getMovieByTitle = function (event) {
  event.preventDefault();

  let title = movieTitleInputEl.value.trim();

  let apiUrl = "https://www.omdbapi.com/?apikey=d2be7440&t=" + title;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {


          let movie = {
            title: data.Title,
            actors: data.Actors,
            awards: data.Awards,
            genre: getFirstGenre(data),
          };

          // add the movie to local storage only if it is not already storage
          let searchedMovies = readSearchedMoviesFromStorage();
          if (searchedMovies.find((searchedMovie) => searchedMovie.title == movie.title) == undefined) {
            searchedMovies.push(movie);
            saveSearchedMoviesToStorage(searchedMovies);
          }

          console.log(data);
          let genre = getFirstGenre(data);
          let drink = getRandomDrinkByGenre(genre);
          console.log("Movie:" + title);
          console.log(data);
          console.log("Genre: " + genre);
          console.log("Drink:" + drink.strDrink);
          drinkImgEl.setAttribute("src", drink.strDrinkThumb);
          movieTitleInputEl.value = '';

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to omdbapi.com');
    });
};

// End of the Code By SI

// Start of code KB

function cleanInput() {
  for(let i=0; i<currentMovie.actors.length; i++) {
    currentMovie.actors[i] = currentMovie.actors[i].trim();
  }
  for(let i=0; i<currentMovie.genre.length; i++) {
    currentMovie.genre[i] = currentMovie.genre[i].trim();
  }
}

function searchMovieByTitle(title, param) {

  let apiUrl = "https://www.omdbapi.com/?apikey=d2be7440&" + param + "=" + title;

  fetch(apiUrl)
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error('Forecast Weather status is not 200 OK');
      }
      return response.json();
    })
    .then(function (data) {
      if (data.Response==="False") {
        throw new Error("Not a valid movie")
      }
      // console.log(data);
      currentMovie.actors = data.Actors.split(",");
      currentMovie.awards = data.Awards;
      currentMovie.poster = data.Poster;
      currentMovie.director = data.Director;
      currentMovie.year = data.Year;
      currentMovie.title = data.Title;
      currentMovie.runtime = data.Runtime;
      currentMovie.rated = data.Rated;
      currentMovie.boxOffice = data.BoxOffice;
      currentMovie.imdbRating = data.imdbRating;
      currentMovie.imdbID = data.imdbID;
      currentMovie.plot = data.Plot;
      currentMovie.genre = data.Genre.split(",");
      cleanInput();
      console.log(currentMovie);
      searchMovies(title);
    })
    .catch(function(err) {
      console.log(err);
      console.log("This is when you show the error modal.");
    });
}

function searchMovies(title) {

  let apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&s=" + title;

  fetch(apiUrl)
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error('Forecast Weather status is not 200 OK');
      }
      return response.json();
    })
    .then(function (data) {
      if (data.Response==="False") {
        throw new Error("No similar movies, invalid movie.");
      }
      // console.log(data);
      for(let i=0; i<data.Search.length; i++) {
        if(data.Search[i].imdbID === currentMovie.imdbID) {
          continue;
        }
        const movie = {};
        movie.poster = data.Search[i].Poster;
        movie.title = data.Search[i].Title;
        movie.year = data.Search[i].Year;
        movie.imdbID = data.Search[i].imdbID;
        similarMovies.push(movie);
      }
      console.log(similarMovies);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function showCurrentPoster() {
  

}

function showSimilarPosters() {

}

function showPosters() {
  showCurrentPoster();
  showSimilarPosters();
}

function getMovieResults(event) {
  event.preventDefault();

  let title = movieTitleInputEl.value.trim();

  searchMovieByTitle(title, "t");

}

// End of code KB

let getDrinks = function () {
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?f=a";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};

let getMovies = function () {

  let apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&s=Teenage Mutant Ninja Turtles";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};

//This function will initialize the ordinary drink list
function init() {
  getOrdinaryDrinks();
}

movieFormEl.addEventListener('submit', getMovieResults);

// init();

// getDrinks();
// getMovies();
