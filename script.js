// $(document).ready(function () {
//
//DOM=======================================================================
var searchCityInput = $("#search-city-input");
var searchHistory = $(".search-history");
var currentCondition = $(".current-condition");
var fiveDayForecast = $(".5-day-forecast");
var weatherToday = $("#weather-today");

var searchCityBtn = $(".fas");
var searchHistoryBtn = $("#search-history-btn");
var uvBtn = $("#uv-btn");
var iconToday = $("#iconToday");

var weatherArray = [];
//User input&Buttons========================================================
//     - User:     search for a city
//     - Return:   current and future conditions for that city / that city is added to the search history

searchCityBtn.on("click", function (event) {
  event.preventDefault();
  console.log("kiki; searchCityBtn clicked");
  displayCurrentCondition();
  display5DayForecast();
});

//
//     - User:     I view current weather conditions for that city
//     - Return:   1.the city name, 2.the date, 3.an icon representation of weather conditions,
//                 4.the temperature, 5.the humidity, 6.the wind speed, 7.and the UV index

searchHistoryBtn.on("click", function (event) {
  event.preventDefault();
  console.log("kiki; searchHistoryBtn clicked");
  displaySearchHistory();
});

//Helper functions=========================================================
var currentDate = moment().format("LLL");
var weatherCondition;
var temperature;
var humidity;
var windSpeed;
var uvIndex; //
var uvCondition;
var fiveDay;

function displayCurrentCondition() {
  var cityValue = searchCityInput.val();
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
    weatherToday.text(response.name + currentDate);
    $("#temperature").text(response.main.temp);
    $("#humidity").text(response.main.humidity);
    $("#windSpeed").text(response.wind.speed);
    var iconNum = response.weather[0].icon;
    // http://openweathermap.org/img/wn/10d@2x.png
    var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    iconToday.attr("src", iconURL);
    // $("#humidity").text(response.main.humidity);
    // $("#uvIndex").text(response.main.humidity);
    // uvIndex http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}
  });
}

function displaySearchHistory() {}

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
    console.log(response);
    var startIndex = Math.floor(new Date().getHours() / 3);
    console.log(startIndex);
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
