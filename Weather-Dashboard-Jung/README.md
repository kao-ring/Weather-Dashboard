# Weather-Dashboard

Unit 06 Server-Side APIs: Weather Dashboard

- Built a weather dashboard using the OpenWeather API
- [Applied to My Reponsive Portfolio](https://eunsoojung.github.io/Unit-02-Responsive-Portfolio/portfolio.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Preview

[![Weather Dashboard](https://github.com/EunsooJung/Weather-Dashboard/blob/master/img/Weather%20Dashboard.gif?raw=true)](https://github.com/EunsooJung/Weather-Dashboard/blob/master/img/Weather%20Dashboard.gif)

## Usage

### Basic Usage

After downloading, simply edit the HTML, CSS and Javascript files included with the template in your favorite text editor to make changes. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Guidelines:

- Proceeds as follows:

  - Create multiple functions within your application to handle the different parts of the dashboard:

  - Current conditions
  - 5-Day Forecast
  - Search history
  - UV index

  - Applied AJAX call.
  - Implemented hardcode some of the Parameters in the API's URL.
  - User input city name will determine some of the other parameters.
  - Clicking on the search button will store the time and user input in localStorage.

### Code Snippet

```javascript
function fiveDayForecast() {
  if ($(this).attr('id') === 'cityList') {
    var x = event.target;
    userInput = $(x).text();
    console.log(userInput);
  } else {
    userInput = $(this)
      .prev()
      .val(); // get user input value
  }
  var dayDisplay = 1;
  var fiveDayCall =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    userInput +
    '&APPID=' +
    myKey;

  // the 5 day forecast AJAX Call
  $.ajax({
    url: fiveDayCall,
    method: 'GET'
  }).then(function(response) {
    // console.log(response);
    var listArray = response.list;
    listArray.forEach(element => {
      // object list
      var yearDateTime = element.dt_txt;
      var currentDate = yearDateTime.split(' ')[0]; //split full date
      var currentTime = yearDateTime.split(' ')[1]; // time

      // get specific time
      if (currentTime === '15:00:00') {
        var day = currentDate.split('-')[2];
        var month = currentDate.split('-')[1];
        var year = currentDate.split('-')[0];
        $('#day-' + dayDisplay)
          .children('.date-display')
          .html(`${month}/${day}/${year}`);
        $('#day-' + dayDisplay)
          .children('#daily-icon')
          .attr(
            'src',
            'http://openweathermap.org/img/w/' +
              element.weather[0].icon +
              '.png'
          );
        $('#day-' + dayDisplay)
          .children('#daily-temp')
          .html(
            `Temperature: ${parseInt(
              (element.main.temp - 273.15) * 1.8 + 32
            )}°F`
          );
        $('#day-' + dayDisplay)
          .children('#5day-humidity')
          .html(`Humidity: ${element.main.humidity}% `);
        dayDisplay++;
      }
    });
  });
}
```

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [moment.js](https://momentjs.com/)

## Authors

- **Michael(Eunsoo)Jung**

* [My Portfolio](https://eunsoojung.github.io/Unit-02-Responsive-Portfolio/portfolio.html)
* [https://eunsoojung.github.io/Weather-Dashboard/](https://eunsoojung.github.io/Weather-Dashboard/)
* [Link to Github](https://github.com/)
* [Link to LinkedIn](www.linkedin.com/in/eun-soo-jung/) www.linkedin.com/in/eun-soo-jung/

## License

This project is licensed under the MIT License
