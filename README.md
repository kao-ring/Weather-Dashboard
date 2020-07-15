# 06 Server-Side APIs: Weather Dashboard

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

- https://kao-ring.github.io/Weather-Dashboard/

- https://github.com/kao-ring/Weather-Dashboard

![Screen Shot 2020-07-15 at 4 16 23 AM](https://user-images.githubusercontent.com/66850293/87521232-16c74f00-c652-11ea-8a89-c066398a469e.png)

## Added Function

- When you search for a city, you will get current and future conditions.

- When you click a search history button, you will get current and future conditions.

- When you click a clear button, all search log are deleted.

- When you hover on UV index, you will see some color depends on UV index.

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
