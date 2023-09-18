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

function getVodkaDrinks() {
    let apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
    
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            adventureDrinksList = data.drinks;})
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
  return genre.split(',')[0];
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

// End of the Code By SI

// var getDrinks= function () {
//     var apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?f=a";
    
//     fetch(apiUrl)
//         .then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//             console.log(data);
//             });
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//         })
//         .catch(function (error) {
//         alert('Unable to connect');
//         });
//     };

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


// getDrinks();
getMovies();
