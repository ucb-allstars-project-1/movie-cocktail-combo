//Start of the Code By SI

const movieTitleInputEl = document.querySelector('#movie-title');
const movieFormEl = document.querySelector('#movie-form');
const drinkImgEl = document.querySelector('#drink-img');
const genres =["Action", "Horror", "Sci-Fi","Animation", "Adventure", "Comedy", "Family","Short","Drama","Romance"];

let ordinaryDrinksList;

//Return a number between min and max-1
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//It returns an index randomly by genre
function getRandomDrinkByGenre(genre){
  let quantityOfDrinkPerGenre = Math.floor(ordinaryDrinksList.length / genres.length);

  let genreIndex = genres.indexOf(genre);
  genreIndex = (genreIndex == -1)? 0: genreIndex;
  let indexInit = (quantityOfDrinkPerGenre * genreIndex);

  let indexEnd = indexInit + quantityOfDrinkPerGenre -1;
  let drinkIndex = getRandomArbitrary(indexInit, indexEnd);
  return ordinaryDrinksList[drinkIndex];
}

function getFirstGenre(data){

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
          printRandomDrinks();})
      } else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to the Cocktaildb.com');
      });
  };


//This function get a ramdom Drink by the movie title that was input by the user in the form
let getMovieByTitle = function(event) {
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
          if (searchedMovies.find((searchedMovie) => searchedMovie.title == movie.title) == undefined){
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

function printRandomDrinks(){
    genres.forEach(element => {
        let randomDrink = getRandomDrinkByGenre(element);
        console.log("Genre: "+ element +" Drink:" + randomDrink.strDrink);
      });
}
//This function will initialize the ordinary drink list
function init(){
    getOrdinaryDrinks();
}


movieFormEl.addEventListener('submit', getMovieByTitle);

init();

// End of the Code By SI

var getDrinks= function () {
    var apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?f=a";
    
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

    var getMovies= function () {

      var apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&s=Teenage Mutant Ninja Turtles";

      
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


getDrinks();
getMovies();
