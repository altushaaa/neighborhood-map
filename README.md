# neighborhood-map: Astana, Kazakhstan
Udacity Neighborhood Map Project

This app was created for Udacity Neighborhood Map Project. It allows people to see the main tourist sights in Astana - the capital of Kazakhstan and my home town. Hope you will learn more about it and come visit!

## How To Use
1. When you load the page initially, the list of main tourist sights and GoogleMaps with markers for the sights will load
2. You can use the input box on the left-hand side to filter the list (and the markers on the map): just type in the partial location name.
3. Click on the list item or on the marker - the app will display an infowindow with a NYTimes article from (the app will let you know if no NYTimes data was found for the selected location).
4. To clear the filter just empty the input box.
5. You can use the 'Hide/Display Sidebar' button at the top to toggle the view of the sidebar.

## Issue
* Cannot load GoogleMaps API async - keep getting this error: "app.js:105 Uncaught ReferenceError: google is not defined":

```html
<script src="js/app.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCK0Y9sEPd8_juTZM-i3xWF_X8jletS_28&v=3&callback=initMap"></script>
```

```js
//Setting up GoogleMap
var map;

initMap = function () {
  var mapElem = document.getElementById('map');
  var mapOps = {
    center: {lat: 51.1200, lng: 71.4305},
    zoom: 13
  };
  map = new google.maps.Map(mapElem, mapOps);
}

initMap();
```
