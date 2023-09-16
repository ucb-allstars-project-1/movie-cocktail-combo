//Start of the Code By SI

const genres =["Action", "Horror", "Sci-Fi","Animation", "Adventure", "Comedy", "Family"];
let oridinaryDrinksList;

//Return a number between min and max-1
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//It returns an index randomly by genre
function getRandomDrinkByGenre(genre){
  let quantityOfDrinkPerGenre = Math.floor(oridinaryDrinksList.length / genres.length);
  let indexInit = (quantityOfDrinkPerGenre * genres.indexOf(genre));
  let indexEnd = indexInit + quantityOfDrinkPerGenre -1;
  let drinkIndex = getRandomArbitrary(indexInit, indexEnd);
  return oridinaryDrinksList[drinkIndex];
}

function getFirstGenre(data){
  return data.Genre.split(',')[0];
}

//Fill the oridinaryDrinksList with an array of ordinary drinks from thecocktail API
function getOrdinaryDrinks() {
  let apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
  
  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data);
          oridinaryDrinksList = data.drinks;
          });
      } else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to the Cocthecocktaildb.com');
      });
  };

//This function has to be called when the user click on the submit button
let getMovieByTitle = function(event) {
  //title = inputTitleEl.value.trim();
  let title = "Blade";
  let apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&t=" + title;
  
  fetch(apiUrl)
      .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log("Movie:" + data);
          let genre = getFirstGenre(data);
          console.log("Genre: " + genre);
          let drink = getRandomDrinkByGenre(genre);
          console.log("Drink:" + drink.strDrink);
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
      var apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&t=Teenage Mutant Ninja Turtles";
      
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
