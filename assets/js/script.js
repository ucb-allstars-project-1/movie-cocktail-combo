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
      var apiUrl = "http://www.omdbapi.com/?apikey=d2be7440&s=blade";
      
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