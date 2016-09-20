/* ======= Model ======= */
/*The Model includes the popular tourist destinations in Astana - the capital city of Kazakhstan*/
var locations = [
    {
        title : 'Bayterek Tower',
        position : {lat: 51.1283, lng: 71.4305}
    },
    {
        title : 'Palace of Peace and Reconciliation',
        position : {lat: 51.123135, lng: 71.463532}
    },
    {
        title : 'Ak-Orda Presidential Palace',
        position : {lat: 51.125836, lng: 71.446325}
    },
    {
        title : 'Rixos President Hotel Astana',
        position : {lat: 51.133501, lng: 71.421223}
    },
    {
        title : 'Khan Shatyr Entertainment Center',
        position : {lat: 51.132539, lng: 71.403822}
    },
    {
        title : 'Expo 2017',
        position : {lat: 51.08922, lng: 71.415963}
    },
    {
        title : 'Astana Opera',
        position : {lat: 51.135319, lng: 71.41065}
    },
    {
        title : 'Astana Marriott Hotel',
        position : {lat:  51.128741, lng: 71.407373}
    },
    {
        title : 'Nazarbayev University',
        position : {lat: 51.09053, lng: 71.398165}
    },
    {
        title : 'Mega Astana Entertainment Center',
        position : {lat: 51.145503, lng: 71.413648}
    },
    {
        title : 'Duman Aquarium and Entertainment Center',
        position : {lat: 51.1469, lng: 71.4149}
    },
    {
        title : 'Hazret Sultan Mosque',
        position : {lat: 51.125488, lng: 71.471935}
    },
    {
        title : 'Astana Arena Stadium',
        position : {lat: 51.108224, lng: 71.402636}
    }
];

var LocModel = function(data) {
  this.title = data.title;
  this.map = data.map;
  this.position = data.position;
};

/* ======= Octopus ======= */
var ViewModel = function() {
  var self = this;
  this.myLocs = ko.observableArray([]);
  locations.forEach(function(locItem){
    self.myLocs.push(new LocModel(locItem));
  });
};

ko.applyBindings(new ViewModel());

// make it go!
//ViewModel.init();

var map;
var markers = [];
function initMap() {
  //Constructor creates a new map - center at Astana, Kazakhstan and zoom at 13
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.1283, lng: 71.4305},
    zoom: 13
  });
  var marker = new google.maps.Marker({
    position: {lat: 51.1283, lng: 71.4305},
    map: map,
    title: "AAA"
  });
}
