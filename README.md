# neighborhood-map: Astana, Kazakhstan
Udacity Neighborhood Map Project

This app was created for Udacity Neighborhood Map Project. It allows people to see the main tourist sights in Astana - the capital of Kazakhstan and my home town. Hope you will learn more about it and come visit!

## How To Use
1. When you load the page initially, the list of main tourist sights and GoogleMaps with markers for the sights will load
2. You can use the input box on the left-hand side to filter the list (and the markers on the map): just type in the partial location name and press the 'Filter' button.
3. Click on the list items or on the markers - the app will display and infowindow with an article from the NYTimes (the app will let you know if no NYTimes data was found for the selected location).
4. To clear the filter, empty the input box and press the 'Filter' button again.
5. You can use the 'Hide/Display Sidebar' button at the top to toggle the view of the sidebar.

## Issue
* The list items are not filtered when the button is pressed: self.allLocs() does not update automatically
