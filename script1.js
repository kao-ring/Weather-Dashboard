// $(document).ready(function () {
//
//DOM=======================================================================
var searchCityInput = $("#search-city-input");
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
var clearBtn = $("#clearBtn");

initialize();

console.log(historyArray);

clearBtn.on("click", function (event) {
  console.log("Clear btn clicked");
  event.preventDefault();
  historyArray.empty();
});
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

//Helper functions=========================================================

function displayConditions() {
  // cityValue = searchCityInput.val();

  var APIkey = "444a2add20a5be5b1aa0fd99ae23639f";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityValue +
    "&appid=" +
    APIkey +
    "&units=imperial"; //metric,imperial

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

    $("#temperature").text(response.main.temp.toFixed(1) + "°F");
    $("#humidity").text(response.main.humidity + "%");
    $("#windSpeed").text(response.wind.speed + "mph");

    var iconNum = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    iconToday.attr("src", iconURL);

    //for UV index
    var uvlat = response.coord.lat;
    var uvlon = response.coord.lon;
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
      var uvShisu = res.value.toFixed(0);
      $("#uvIndex").text(uvShisu);
    });

    //Store to the history
    historyArray.push(response.name);
    localStorage.setItem("cities", JSON.stringify(historyArray));

    // let historyBtn = document.createElement("button");
    // historyBtn.setAttribute("id", "searchHistoryBtn");
    // historyBtn.setAttribute("class", "btn btn-light");
    // historyBtn.textContent = response.name;
    // historyBtn.addEventListener("click", () => {
    //   console.log(event);
    //   event.preventDefault();
    //   console.log("history button clicked");
    //   cityValue = $("#searchHistoryBtn").text();
    //   //console.log("This is the city value " + cityValue);
    //   displayConditions();
    // });

       historyBtn.click(function (event) {
      console.log(event);
      event.preventDefault();
      console.log("history button clicked");
      cityValue = $("#searchHistoryBtn").text();
      //console.log("This is the city value " + cityValue);
      displayConditions();
    });
    }); 
    /* var newHistory = $(
      '<button type="button" class="btn btn-light" id="searchHistoryBtn">'
    ).text(response.name); */

    searchHistory.prepend(historyBtn);
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
    console.log(response);
    for (let i = startIndex; i < response.list.length; i += 8) {
      var newCard = $(
        '<div id="day0" class="card-body mx-2 my-2 bg-dark text-white">'
      );
      var dt = response.list[i].dt_txt.split();

      console.log(dt);
      var newDate = $("<h5>").text(response.list[i].dt_txt);
      var newTemp = $("<p>").text(response.list[i].main.temp);
      var newHumid = $("<p>").text(response.list[i].main.humidity);
      newCard.append(newDate, newTemp, newHumid);
      $("#fivedayforecast").append(newCard);
    }
  });
}
