const movieTitleInputEl = document.querySelector('#movie-title');
const movieFormEl = document.querySelector('#movie-form');
const drinkImgEl = document.querySelector('#drink-img');
const genres =["Action", "Horror", "Sci-Fi","Animation", "Adventure", "Comedy", "Family","Short","Drama","Romance"];

let ordinaryDrinksList;


function drinkArrayByGenre(firstGenre) {
    if (firstGenre === "Adventure") {
        console.log("true");
        let drinkType = "Vodka";
        getDrinksArray(drinkType);
    }
    if (firstGenre === "Action") {
        let drinkType = "Whiskey";
    }
    if (firstGenre === "Comedy") {
        let drinkType = "Rum";
    }
    if (firstGenre === "Horror") {
        let drinkType = "Gin";
    }
    if (firstGenre === "Sci-Fi") {
        let drinkType = "Wine";
    }
    if (firstGenre === "Drama") {
        let drinkType = "Tequila";
    }
}

function getDrinksArray(drinkType) {
    let apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkType;
    
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            let randomArrayItem = Math.floor(Math.random() * data.drinks.length);
            let randomDrink = data.drinks[randomArrayItem].strDrink;
            console.log(randomDrink);
        })
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to the Cocktaildb.com');
        });
    };


function getFirstGenre(genre){
    console.log(genre);
    console.log(genre.split(',')[0]);
    let firstGenre = genre.split(',')[0];
    drinkArrayByGenre(firstGenre);
}

//Fill the oridinaryDrinksList with an array of ordinary drinks from thecocktail API
function getOrdinaryDrinks() {
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
  
  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data);
          let randomArrayItem = Math.floor(Math.random() * data.drinks.length);
            let randomDrink = data.drinks[randomArrayItem].strDrink;
            console.log(randomDrink);
          //The next line has to be deleted
})
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

            let genre = data.Genre;
            let title = data.Title;
         getFirstGenre(genre);
          let drink = getRandomDrinkByGenre(genre);
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

//This function will initialize the ordinary drink list
function init(){
    getOrdinaryDrinks();
}


movieFormEl.addEventListener('submit', getMovieByTitle);

init();

// Currently using this fetch function for testing until title search initiated
    var getMovies= function () {

      var apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&t=barbie";

      
      fetch(apiUrl)
          .then(function (response) {
          if (response.ok) {
              response.json().then(function (data) {
              console.log(data);
              let genre = data.Genre;
              getFirstGenre(genre);
              let title = data.Title;
              console.log(title);
              });
          } else {
              alert('Error: ' + response.statusText);
          }
          })
          .catch(function (error) {
          alert('Unable to connect');
          });
      };

getMovies();
