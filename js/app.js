/* ======= Model ======= */
/*The Model includes the popular tourist destinations in Astana - the capital city of Kazakhstan*/
var locations = [
    {
        title : 'Baiterek Tower',
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
        title : 'Astana Expo 2017',
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

  var self = this;
  var map;
  var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  //Constructor creates a new map - center at Astana, Kazakhstan and zoom at 13
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.1200, lng: 71.4305},
    zoom: 13
  });

  //Initial display of locations list and markers on the #map and creation of infowindows with NYT API
  var markers =[];
  var infowindows = [];
  this.myLocs = ko.observableArray([]);
  locations.forEach(function(locItem){
    self.myLocs().push(new LocModel(locItem));
    var marker = new google.maps.Marker({
      position: locItem.position,
      map: map,
      title: locItem.title,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

    var infowindow = new google.maps.InfoWindow ({
    });

    // NYTimes API for each list item to be displayed in the infowindow
    // As a base used the code built by LucyBot. www.lucybot.com provided in the NYT API documentation
    NYTurl += '?' + $.param({
      'api-key': "1a91a51531bf4df3a90a2b446d8ee0b6",
      'q': locItem.title
    });
    $.ajax({
      url: NYTurl,
      method: 'GET',
    }).done(function(result) {
      //console.log(locItem.title);
      //handle the error when NYTimes Article Search does not return a result by notifying the user in the infowindow
      if (result.response.docs[0] == undefined) {
        apiStr = '<h3>' + locItem.title + '</h3>' + '<p> No NYTimes API loaded.</p>';
      } else {
        apiStr = '<h3>' + locItem.title + '</h3>' + '<p>' + result.response.docs[0].lead_paragraph + '</p>' +
       '<p> Attribution: NYTimes <a href="' + result.response.docs[0].web_url + '">'+
        result.response.docs[0].web_url + '</a></p>';
      }
      infowindow.setContent(apiStr);
    },this).fail(function(err) {
      throw err;
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
    infowindows.push(infowindow);
  });
  console.log(self.myLocs());
  console.log(markers);
  console.log(infowindows);

  //Open infowindow when the list item is clicked and close when user moves the cursor away
  this.dispInfo = function() {
      var i = self.myLocs().indexOf(this);
      infowindows[i].open(map,markers[i]);
  }
  this.hideInfo = function() {
      var i = self.myLocs().indexOf(this);
      infowindows[i].close();
  }

  // Hide/display sidebar when button clicked through toggling display property
  this.sidebar = function(){
    $('#sidebar').toggle();
  }

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
    // TO DO: find out why self.myLocs() is not updating the locations list
    // 1. it works as intended outside the filter function ---> so could it be scope problem?
    // 2. doesn't seem like there is a problem with the scope as filter was tied in self
    // 3. this.myLocs() just does not seem to update automatically (binding not working properly?)
  }
};

ko.applyBindings(new ViewModel());
