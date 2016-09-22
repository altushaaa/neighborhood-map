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
* The list items are not filtered when the button is pressed: self.allLocs() does not update automatically:

```
// Filter the list and markers based on the text inputted by the user into the input form upon button click
// If user submitted empty, the Filter button will clear the filter and display all list items and markers ("else" statement)
this.filter = function() {
  var data = document.getElementById('input').value; //used "AsT" to test
  console.log(data);
  for (i=0; i<self.myLocs().length; i++) {
    //if the lookup value is not a part of the list item name, hide the list item and it's marker
    if (!self.myLocs()[i].title.toLowerCase().includes(data.toLowerCase())) {
      self.myLocs()[i].Disp = false;
      //console.log(self.myLocs()[i]);
      markers[i].setVisible(false);
    } else { //otherwise display them
      self.myLocs()[i].Disp = true;
      //console.log(self.myLocs()[i]);
      markers[i].setVisible(true);
    }
  }
  // TO DO: find out why self.myLocs() is not updating the locations list (not filtering the list)
  // 1. it works as intended outside the filter function (i.e., filters both list and markers)---> so could it be scope problem?
  // 2. doesn't seem like there is a problem with the scope as filter was tied in self
  // 3. this.myLocs() just does not seem to update automatically (binding not working properly?)
}
```
