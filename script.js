//DOM & declairs=================================================================
var searchCityInput = $("#search-city-input");
var searchBtn = $("#search-btn");
var cityValue;

var currentCity = $("#current-city");
var currentDate = $("#current-date");

var cityList = [];

// var cityListBtn = $("#city-list-btn");

//Start here======================================================================
searchBtn.on("click", function () {
  console.log("searchBtn clicked");
  $("#fivedayforecast").empty(); //testing OK!!!
  cityValue = searchCityInput.val();
  cityList.push(cityValue);
  currentCondition();
  fiveDayForecast();
  renderButtons();
});

function currentCondition() {
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
    // console.log(response);

    currentCity.text(response.name + ", " + response.sys.country);
    currentDate.text(moment().format("LLL"));
    //get weather icon
    var iconNum = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    $("#iconToday").attr("src", iconURL);
    $("#iconToday").attr("alt", "weather-icon");

    $("#temperature").text(response.main.temp.toFixed(1) + "°F");
    $("#humidity").text(response.main.humidity + "%");
    $("#windSpeed").text(response.wind.speed.toFixed(1) + "mph");
    //UV index
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
      //   console.log("UV index");
      //   console.log(res);
      var uvShisu = res.value.toFixed(0);
      $("#uvIndex").text(uvShisu);
    });
  });
}

function fiveDayForecast() {
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
    // console.log(response);
    for (let i = startIndex; i < response.list.length; i += 8) {
      var newCard = $(
        '<div id="forecast" class="card-body mx-2 my-2 bg-info text-white">'
      );
      var dt =
        response.list[i].dt_txt.split(" ")[0].split("-")[1] +
        "-" +
        response.list[i].dt_txt.split(" ")[0].split("-")[2];

      var newDate = $("<h5>").text(dt);
      var newTemp = $("<p>").text("Temp:" + response.list[i].main.temp + "°F");
      var newHumid = $("<p>").text(
        "Humid:" + response.list[i].main.humidity + "%"
      );
      //get weather icon
      var iconNum = response.list[i].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      var newIcon = $('<img id="newIcon">').attr("src", iconURL);
      $("#iconToday").attr("alt", "weather-icon");

      newCard.append(newDate, newIcon, newTemp, newHumid);
      $("#fivedayforecast").append(newCard);
    }
  });
}

function renderButtons() {
  $("#search-history").empty();
  for (var i = 0; i < cityList.length; i++) {
    var a = $('<button type="button" class="clbtn btn btn-light ">');
    a.text(cityList[i]);
    $("#search-history").prepend(a);
    listClick();
  }
}

function listClick() {
  $(".clbtn").on("click", function (event) {
    event.preventDefault();
    console.log("cityListBtn clicked");

    cityValue = $(this).text();
    console.log(cityValue);
  });
}
