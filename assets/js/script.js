//Start of the Code By SI

const movieTitleInputEl = document.querySelector('#movie-title');
const movieFormEl = document.querySelector('#movie-form');
const drinkNameEl = document.querySelector('#drink-name');
const drinkImgEl = document.querySelector('#drink-img');
const drinkInstructionsEl = document.querySelector('#drink-instructions');
const drinkIngredientsEl = document.querySelector('#drink-ingredients');
const drinkMeasurementsEl = document.querySelector('#drink-measurements');
const genres = ["Action", "Horror", "Sci-Fi", "Animation", "Adventure", "Comedy", "Family", "Short", "Drama", "Romance"];

const currentMovie = {};
const currentDrink = {};
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



//Fill the oridinaryDrinksList with an array of ordinary drinks from thecocktail API
function getOrdinaryDrinks() {
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
  
  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data);
          ordinaryDrinksList = data.drinks;
        })
      } else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to the Cocktaildb.com');
      });
}

function searchDrinkById(drinkId){
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
            let drink = data.drinks[0];
            console.log(drink);
            currentDrink.id = drink.idDrink;
            currentDrink.name = drink.strDrink;
            currentDrink.imageUrl = drink.strDrinkThumb;
            currentDrink.instructions = drink.strInstructions;
            currentDrink.ingredients = drink.strIngredient1;
            currentDrink.measurements = drink.strMeasure1;
            showCurrentDrink();
          })
      } else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
          alert('Unable to connect to the Cocktaildb.com');
      });
}

function selectDrinkByGenre(){
  //in case the current does not have a genre, it will select a drink by genres[0]
  let genre = Array.isArray(currentMovie.genre.length > 0) ? currentMovie.genre[0] : genres[0];
  let drink = getRandomDrinkByGenre(genre);
  searchDrinkById(drink.idDrink);
}

function showCurrentDrink(){
  drinkNameEl.textContent = currentDrink.name;
  drinkImgEl.setAttribute("src", currentDrink.imageUrl);
  drinkInstructionsEl.textContent = currentDrink.instructions;
  drinkIngredientsEl.textContent = currentDrink.ingredients;
  drinkMeasurementsEl.textContent = currentDrink.measurements;
}

// Reads drinks from local storage and returns array of drinks objects.
// Returns an empty array ([]) if there aren't any drinks.
function readFavoriteDrinksFromStorage() {
  let favoriteDrinks = localStorage.getItem('favorite-drinks');
  if (favoriteDrinks) {
    favoriteDrinks = JSON.parse(favoriteDrinks);
  } else {
    favoriteDrinks = [];
  }
  return favoriteDrinks;
}

// Takes an array of drinks and saves them in localStorage.
function saveFavoriteDrinksToStorage(favoriteDrinks) {
  localStorage.setItem('favorite-drinks', JSON.stringify(favoriteDrinks));
}

// Add the current drink to the list of favorite drinks if it is not already in
function saveCurrentDrinkAsFavorite(){
    // add the movie to local storage only if it is not already storage
    let favoriteDrinks = readFavoriteDrinksFromStorage();
    if (favoriteDrinks.find((drink => drink.id == currentDrink.id) == undefined)){
      favoriteDrinks.push(currentDrink);
      saveFavoriteDrinksToStorage(favoriteDrinks);
    }
}

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
        selectDrinkByGenre();
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

function getMovieResults() {
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



movieFormEl.addEventListener('submit', function (event){ 
  event.preventDefault();
  getMovieResults();
  //selectDrinkByGenre();
});

init();

//getDrinks();
//getMovies();
