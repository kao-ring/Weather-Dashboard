$(document).ready(function () {
  //
  //DOM===============

  var searchHistory = $(".search-history");
  var currentCondition = $(".current-condition");
  var fiveDayForecast = $(".5-day-forecast");

  var searchCityBtn = $("＃search-city-btn");
  var searchHistoryBtn = $("#search-history-btn");
  var uvBtn = $("#uv-btn");

  //     - User:     search for a city
  //     - Return:   current and future conditions for that city / that city is added to the search history
  searchCity.on("click", function (event) {
    event.preventDefault();
    displayCurrentCondition();
  });

  //
  //     - User:     I view current weather conditions for that city
  //     - Return:   1.the city name, 2.the date, 3.an icon representation of weather conditions,
  //                 4.the temperature, 5.the humidity, 6.the wind speed, 7.and the UV index

  var cityName;
  var cityURL;
  var currentDate;
  var weatherCondition;
  var temperature;
  var humidity;
  var windSpeed;
  var uvIndex;
  //city name list
  //compare typed city and list
  //is entry number or string?

  function displayCurrentCondition() {
    $.getJSON(cityURL, function (data) {
      console.log(data);
    });
  }

  //
  //     - User:     I view the UV index
  //     - Return:   a color that indicates whether the conditions are
  //                 1.favorable, 2.moderate, or 3.severe
  var uvCondition;
  //
  //     - User:     I view future weather conditions for that city
  //     - Return:   I am presented with a 5-day forecast that displays 1.the date,
  //                 2.an icon representation of weather conditions, 3.the temperature, and 4.the humidity
  var fiveDay;

  //
  //     - User:     I click on a city in the search history
  //     - Return:   I am again presented with current and future conditions for that city
  //
  //     - User:     I open the weather dashboard
  //     - Return:   I am presented with the last searched city forecast
});
