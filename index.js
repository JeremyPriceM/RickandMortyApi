'use strict';

const searchURL = "https://rickandmortyapi.com/api/character";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getSwiftyToons(searchTerm) {
  const params = {
    name: searchTerm,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty('');
  let length = responseJson.results.length;
  for (let i = 0; i < length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.results[i].name}</h3>
      <p><span>Status:</span> ${responseJson.results[i].status}</P>
      <p><span>Species:</span> ${responseJson.results[i].species}</P>
      <p><span>Origin:</span> ${responseJson.results[i].origin.name}</P>
      <p><span>Last Known Location:</span> ${responseJson.results[i].location.name}</P>
      <img src='${responseJson.results[i].image}'><hr />
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
  $('#container2').removeClass('hidden');
  $('html, body').animate({
    scrollTop: $("#results").offset().top
  }, 800);
}


//function scrollResults() {
  //$('html, body').animate({
    //scrollTop: $("#results").offset().top
//}, 2000);
//});
//}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#cName').val();
    getSwiftyToons(searchTerm);
  });
}

$(watchForm);