// $(document).ready(function () {
//
//DOM=======================================================================
var searchCityInput = $("#search-city-input");
var searchHistory = $(".search-history");
var currentCondition = $(".current-condition");
var fiveDayForecast = $(".5-day-forecast");
var weatherToday = $("#weather-today");
var currentCity = $("#current-city");
var currentDate = $("#current-date");
var cityValue;
var weatherCondition;
var temperature;
var humidity;
var windSpeed;
var uvIndex;
var uvCondition;
var fiveDay;

var searchCityBtn = $(".fas");
var searchHistory = $("#search-history");
var searchHistoryBtn = $("#searchHistoryBtn");
var uvBtn = $("#uv-btn");
var iconToday = $("#iconToday");
var historyArray = [];

initialize();

//initialize-get history data back to searchHistiryBtn
// let storedCities = JSON.parse(localStorage.getItem("cities"));
function initialize() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    historyArray = storedCities;
  }

  // renderButtons();
}

//User input&Buttons========================================================
//     - User:     search for a city
//     - Return:   current and future conditions for that city / that city is added to the search history

searchCityBtn.on("click", function (event) {
  event.preventDefault();
  cityValue = searchCityInput.val();

  displayConditions();
  display5DayForecast();
});

//
//     - User:     I view current weather conditions for that city
//     - Return:   1.the city name, 2.the date, 3.an icon representation of weather conditions,
//                 4.the temperature, 5.the humidity, 6.the wind speed, 7.and the UV index

searchHistoryBtn.on("click", function (event) {
  event.preventDefault();
  console.log("history button clicked");
  cityValue = $(this).val();
  displayConditions();
});

//Helper functions=========================================================

function displayConditions() {
  // cityValue = searchCityInput.val();

  var APIkey = "444a2add20a5be5b1aa0fd99ae23639f";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityValue +
    "&appid=" +
    APIkey +
    "&units=metric"; //metric,imperial

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // console.log(response.dt_text);

    //current information
    currentCity.text(response.name + ", " + response.sys.country);
    // currentDate.text(moment.unix(response.dt).format("MM/DD h:mm a"));
    currentDate.text(moment().format("LLL"));

    $("#temperature").text(response.main.temp);
    $("#humidity").text(response.main.humidity);
    $("#windSpeed").text(response.wind.speed);

    var iconNum = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    iconToday.attr("src", iconURL);

    //for UV index
    var uvlat = response.coord.lat;
    var uvlon = response.coord.lon;
    // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIkey +
      "&lat=" +
      uvlat +
      "&lon=" +
      uvlon;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (res) {
      console.log("UV index");
      console.log(res);
      $("#uvIndex").text(res.value);
    });

    //Store to the history
    historyArray.push(response.name);
    localStorage.setItem("cities", JSON.stringify(historyArray));

    var newHistory = $(
      '<button type="button" class="btn btn-light" id="searchHistoryBtn">'
    ).text(response.name);
    searchHistory.prepend(newHistory);
  });
}

// function renderButtons() {
//   // $(searchHistoryBtn).empty();
//   for (var i = 0; i < historyArray.length; i++) {
//     var a = $(
//       '<button type="button" class="btn btn-light" id="searchHistoryBtn">' +
//         response.name +
//         "</button>"
//     );

//     $(searchHistory).append(a);
//   }
// }

function display5DayForecast() {
  var cityValue = searchCityInput.val();
  var APIkey = "444a2add20a5be5b1aa0fd99ae23639f";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityValue +
    "&appid=" +
    APIkey +
    "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var startIndex = Math.floor(new Date().getHours() / 3);

    for (let i = startIndex; i < response.list.length; i += 8) {
      var newCard = $(
        '<div id="day0" class="card-body mx-2 my-2 bg-dark text-white">'
      );
      var newDate = $("<h5>").text(response.list[i].dt_txt);
      var newTemp = $("<p>").text(response.list[i].main.temp);
      var newHumid = $("<p>").text(response.list[i].main.humidity);
      newCard.append(newDate, newTemp, newHumid);
      $("#fivedayforecast").append(newCard);
    }
  });
}

//
//     - User:     I view the UV index
//     - Return:   a color that indicates whether the conditions are
//                 1.favorable, 2.moderate, or 3.severe

//
//     - User:     I view future weather conditions for that city
//     - Return:   I am presented with a 5-day forecast that displays 1.the date,
//                 2.an icon representation of weather conditions, 3.the temperature, and 4.the humidity

//
//     - User:     I click on a city in the search history
//     - Return:   I am again presented with current and future conditions for that city
//
//     - User:     I open the weather dashboard
//     - Return:   I am presented with the last searched city forecast
// });
