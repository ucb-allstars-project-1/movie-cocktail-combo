const movieTitleInputEl = document.querySelector('#movie-title');
const movieFormEl = document.querySelector('#movie-form');
const drinkNameEl = document.querySelector('#drink-name');
const drinkImgEl = document.querySelector('#drink-img');
const drinkInstructionsEl = document.querySelector('#drink-instructions');
const drinkIngredientsEl = document.querySelector('#drink-ingredients');
const drinkMeasurementsEl = document.querySelector('#drink-measurements');
const genres = ["Action", "Horror", "Sci-Fi", "Animation", "Adventure", "Comedy", "Family", "Short", "Drama", "Romance","Documentary"];

const currentMovie = {};
const currentDrink = {};
const similarMovies = [];

// Variables related to modals code by TP
const modal = document.querySelector(".modal");
const movieModal = document.querySelector("#movie-error");
const drinkModal = document.querySelector("#drink-error");
const faveDrinkModal = document.querySelector("#fave-drink-modal");
const modalEls = document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'); 
// End of code by TP

// It will storage all the ordinary drinks requested from the Cocktailsdb API
let ordinaryDrinksList;

//Return a number between min and max-1
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//It returns an index randomly by genre, in a way that it will not return the same index for two different genres
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
          ordinaryDrinksList = data.drinks;
        })
      } else {
        console.log('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
        openModal(drinkModal);
      });
}

// Creates an array with all the ingredients
function createIngredientsList(drink){
  let ingredients = [];
  for (i=1; i<=15; i++){
    let ingredient = drink[`strIngredient${i}`];
    if (ingredient !== null) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}

// Creates an array with all the measurements
function createMeasurementsList(drink){
  let measurements = [];
  for (i=1; i<=15; i++){
    let measurement = drink[`strMeasure${i}`];
    if (measurement !== null) {
      measurements.push(measurement);
    }
  }
  return measurements;
}

// Creates a new string with all the ingredients and measures side by side
function createIngredientsAndMeasuresSideBySide(){
  let ingredientsAndMeasures = 'Ingredients: ';
  let ingredients = currentDrink.ingredients;
  let measurements = currentDrink.measurements;
  for (i=1; i<=15; i++){
    if (ingredients[i] != null){
      ingredientsAndMeasures = (measurements[i] != null) ? ingredientsAndMeasures + ` ${measurements[i]} ${ingredients[i]}, `
        :ingredientsAndMeasures + ` ${ingredients[i]},`;
    }
  }
  return ingredientsAndMeasures;
}

// Made a request to select a drink by id
function searchDrinkById(drinkId){
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
            let drink = data.drinks[0];
            currentDrink.id = drink.idDrink;
            currentDrink.name = drink.strDrink;
            currentDrink.imageUrl = drink.strDrinkThumb;
            currentDrink.instructions = drink.strInstructions;
            currentDrink.ingredients = createIngredientsList(drink);
            currentDrink.measurements = createMeasurementsList(drink);
            showCurrentDrink();
            showCurrentPoster();
          })
      } else {
          console.log('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
        openModal(drinkModal);
      });
}

// Select a drink randomly by Genre
function selectDrinkByGenre(){
  //in case the current movie does not have a genre, it will select a drink by genres[0]
  let genre = Array.isArray(currentMovie.genre.length > 0) ? currentMovie.genre[0] : genres[0];
  let drink = getRandomDrinkByGenre(genre);
  searchDrinkById(drink.idDrink);
}

// Display the current drink on the page
function showCurrentDrink(){
  drinkNameEl.textContent = currentDrink.name;
  drinkImgEl.setAttribute("src", currentDrink.imageUrl);
  drinkInstructionsEl.textContent = currentDrink.instructions;
  drinkIngredientsEl.textContent = createIngredientsAndMeasuresSideBySide();
}

// End of the Code By SI

//Start of code by Maddie

function saveCurrentDrink() {
  let currentDrink = document.getElementById("drink-name").textContent;
  //console.log(currentDrink);
  
  const existingDrinks = JSON.parse(localStorage.getItem("storeDrinks")) || [];
  existingDrinks.push(currentDrink);

  localStorage.setItem("storeDrinks", JSON.stringify(existingDrinks));
}

function setFavoriteDrinks() {
  const drinkStorage = document.getElementById("favorite-cocktails");
  drinkStorage.innerHTML = "";
  const drinkHistory = JSON.parse(localStorage.getItem("storeDrinks"));

  for (let i = 0; i < drinkHistory.length; i++) {
    let savedDrinks = document.createElement("a");
    savedDrinks.textContent = drinkHistory[i];

    let drinkTitle = savedDrinks.textContent;
    //console.log(drinkTitle);

    drinkStorage.appendChild(savedDrinks);
  }
}

const checkBox = document.getElementById("checkbox");
checkBox.addEventListener("click", function(event) {
  event.preventDefault();
  saveCurrentDrink();
  setFavoriteDrinks();
})

// End of code by Maddie


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
      currentMovie.actors = data.Actors;
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
      currentMovie.genre = data.Genre;
      cleanInput();
      console.log(currentMovie);
      selectDrinkByGenre();
      searchMovies(title);
      //showCurrentPoster();
    })
    .catch(function(err) {
      console.log(err);
      openModal(movieModal);
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
      openModal(movieModal);
    });
}

function showCurrentPoster() {
  $("#movie-photo").attr("src", currentMovie.poster);
  $("#movie-title-text").text(currentMovie.title);
  $("#movie-genre").text("Genre: " + currentMovie.genre);
  $("#movie-rated").text("Rated: " + currentMovie.rated);
  $("#movie-director").text("Director: " + currentMovie.director);
  $("#movie-actors").text("Actors: " + currentMovie.actors);
  $("#movie-awards").text("Awards: " + currentMovie.awards);
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

// Start of code TP

function openModal(drinkModal) {
  drinkModal.classList.add('is-active')
  }

  function openModal(movieModal) {
    movieModal.classList.add('is-active');
  }

  function closeModal(modal) {
    modal.classList.remove('is-active');
  }

  modalEls.forEach(function (x) {
    x.addEventListener('click', () => {
      closeModal(drinkModal);
      closeModal(movieModal);
      closeModal(faveDrinkModal);
    })
  })

// End of code TP

// this function has to be deleted
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

// this function has to be deleted
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
});

init();

//getDrinks();
//getMovies();
