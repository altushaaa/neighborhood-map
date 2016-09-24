/* ======= Model ======= */
/*The Model includes the popular tourist destinations in Astana - the capital city of Kazakhstan*/
var locations = [
    {
        title : 'Baiterek Tower',
        position : {lat: 51.1283, lng: 71.4305},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Palace of Peace and Reconciliation',
        position : {lat: 51.123135, lng: 71.463532},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Ak-Orda Presidential Palace',
        position : {lat: 51.125836, lng: 71.446325},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Rixos President Hotel Astana',
        position : {lat: 51.133501, lng: 71.421223},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Khan Shatyr Shopping & Entertainment Center',
        position : {lat: 51.132539, lng: 71.403822},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Astana Expo 2017',
        position : {lat: 51.08922, lng: 71.415963},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Astana Opera',
        position : {lat: 51.135319, lng: 71.41065},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Astana Marriott Hotel',
        position : {lat:  51.128741, lng: 71.407373},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Nazarbayev University',
        position : {lat: 51.09053, lng: 71.398165},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Mega Astana Shopping & Entertainment Center',
        position : {lat: 51.145503, lng: 71.413648},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Duman Aquarium and Entertainment Center',
        position : {lat: 51.1469, lng: 71.4149},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Hazret Sultan Mosque',
        position : {lat: 51.125488, lng: 71.471935},
        marker: {},
        infowindow: {}
    },
    {
        title : 'Astana Arena Stadium',
        position : {lat: 51.108224, lng: 71.402636},
        marker: {},
        infowindow: {}
    }
];

var LocModel = function(data) {
  this.title = data.title;
  this.position = data.position;
  this.marker = data.marker;
  this.infowindow = data.infowindow;
};

/* ======= Octopus/ViewModel ======= */

var ViewModel = function() {
  var self = this;

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

  this.myLocs = ko.observableArray([]);

  locations.forEach(function(locItem){
    //create marker for each list item
    var marker = new google.maps.Marker({
      position: locItem.position,
      map: map,
      title: locItem.title,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      locItem.marker = marker;

      //create infowindows
      var infowindow = new google.maps.InfoWindow ({
      });
      locItem.infowindow = infowindow;

      //populate the myLocs() observableArray
      self.myLocs().push(new LocModel(locItem));

    // NYTimes API for each list item to be displayed in the infowindow
    // As a base used the code built by LucyBot. www.lucybot.com provided in the NYT API documentation
    var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
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
        apiStr = '<h3>' + locItem.title + '</h3>' + '<p> No NYTimes article could be loaded this time.</p>';
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
  });
  console.log(self.myLocs());

  //Open infowindow when the list item is clicked and close when user moves the cursor away
  this.dispInfo = function() {
    this.infowindow.open(map,this.marker);
  }
  this.hideInfo = function() {
    this.infowindow.close();
  }

  // Hide/display sidebar when button clicked through toggling display property
  this.sidebar = function(){
    $('#sidebar').toggle();
  }

  // Filter the list and markers based on the text inputted by the user into the input form
  this.userInput = ko.observable('');
  //http://knockoutjs.com/documentation/computedObservables.html
  this.listFilter = ko.computed(function() {
    //console.log(self.userInput()); - to check the textInput binding
    var data = self.userInput().toLowerCase();

    if (!data) {
        return self.myLocs();
    } else {
        return ko.utils.arrayFilter(self.myLocs(), function(myLoc) {
          var title = myLoc.title.toLowerCase();
          //syncing markers visibility with the filtered observableArray
          //(advice from https://discussions.udacity.com/t/trouble-filtering-list-view-and-map-markers/168145/14)
          var status = title.indexOf(data) !== -1; //returns "true" if the inputText is not a part of list item title
          myLoc.marker.setVisible(status);
          return title.indexOf(data) !== -1;
        });
    }
  });
};

ko.applyBindings(new ViewModel());
