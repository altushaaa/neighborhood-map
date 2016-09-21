/* ======= Model ======= */
/*The Model includes the popular tourist destinations in Astana - the capital city of Kazakhstan*/
var locations = [
    {
        title : 'Bayterek Tower',
        Disp: true,
        position : {lat: 51.1283, lng: 71.4305}
    },
    {
        title : 'Palace of Peace and Reconciliation',
        Disp: true,
        position : {lat: 51.123135, lng: 71.463532}
    },
    {
        title : 'Ak-Orda Presidential Palace',
        Disp: true,
        position : {lat: 51.125836, lng: 71.446325}
    },
    {
        title : 'Rixos President Hotel Astana',
        Disp: true,
        position : {lat: 51.133501, lng: 71.421223}
    },
    {
        title : 'Khan Shatyr Entertainment Center',
        Disp: true,
        position : {lat: 51.132539, lng: 71.403822}
    },
    {
        title : 'Expo 2017',
        Disp: true,
        position : {lat: 51.08922, lng: 71.415963}
    },
    {
        title : 'Astana Opera',
        Disp: true,
        position : {lat: 51.135319, lng: 71.41065}
    },
    {
        title : 'Astana Marriott Hotel',
        Disp: true,
        position : {lat:  51.128741, lng: 71.407373}
    },
    {
        title : 'Nazarbayev University',
        Disp: true,
        position : {lat: 51.09053, lng: 71.398165}
    },
    {
        title : 'Mega Astana Entertainment Center',
        Disp: true,
        position : {lat: 51.145503, lng: 71.413648}
    },
    {
        title : 'Duman Aquarium and Entertainment Center',
        Disp: true,
        position : {lat: 51.1469, lng: 71.4149}
    },
    {
        title : 'Hazret Sultan Mosque',
        Disp: true,
        position : {lat: 51.125488, lng: 71.471935}
    },
    {
        title : 'Astana Arena Stadium',
        Disp: true,
        position : {lat: 51.108224, lng: 71.402636}
    }
];

var LocModel = function(data) {
  this.title = data.title;
  this.Disp = data.Disp;
  this.position = data.position;
};

/* ======= Octopus ======= */

var ViewModel = function() {

  var map;
  //Constructor creates a new map - center at Astana, Kazakhstan and zoom at 13
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.1200, lng: 71.4305},
    zoom: 13
  });

  //Displaying list of locations under <ul> and markers on the #map - tied to myLocs() observableArray
  var self = this;
  var markers =[];
  this.myLocs = ko.observableArray([]);
  locations.forEach(function(locItem){
    self.myLocs.push(new LocModel(locItem));
    var marker = new google.maps.Marker({
      position: locItem.position,
      map: map,
      title: locItem.title,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    var infowindow = new google.maps.InfoWindow ({
      content: locItem.title
    });

    //open marker infowindow and decorate the marker when it's clicked
    marker.addListener('click', function() {
      infowindow.open(map,marker);
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    });

    //hide the infowindow and return marker to normal when user mouses-out
    marker.addListener('mouseout', function() {
        infowindow.close();
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    });
    markers.push(marker);
  });
  console.log(self.myLocs());
  console.log(markers);

  //Filter the list and markers based on the text inputted by the user into the input form upon button click
  //If user submitted empty, the Filter button will clear the filter and display all list items and markers
  this.filter = function() {
    var data = document.getElementById('input').value;
    for (i=0; i<self.myLocs().length; i++) {
      if (!self.myLocs()[i].title.toLowerCase().includes(data.toLowerCase())) {
        self.myLocs()[i].Disp = false;
        console.log(self.myLocs()[i]);
        markers[i].setVisible(false);
      } else {
        self.myLocs()[i].Disp = true;
        console.log(self.myLocs()[i]);
        markers[i].setVisible(true);
      }
      console.log(self.myLocs());
    }
    //TO DO: find out why self.myLocs() is not updating the locations list
    return self.myLocs();
  },this
};

ko.applyBindings(new ViewModel());
