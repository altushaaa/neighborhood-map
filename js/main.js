var locations =[
  {title: "Park Ave", location: {lat: 40, lng: -70}};
  {title: "Park Ave", location: {lat: 40, lng: -70}};
  {title: "Park Ave", location: {lat: 40, lng: -70}};
  {title: "Park Ave", location: {lat: 40, lng: -70}};
  {title: "Park Ave", location: {lat: 40, lng: -70}};
]

var tribeca = {lat: 40.719526, lng: -74.0089934};
var marker = new google.maps.Marker({
  position: tribeca,
  map: map,
  title: "First Marker - Tribeca"
});
var infowindow = new google.maps.InfoWindow ({
  content: "This is the InfoWindow" +
      "Let's get started"
});
marker.addListener('click', function() {
  infowindow.open(map,marker);
});


$(".form-horizontal").submit(loadData);

function loadData (){
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    //clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //streetview code here
    var address = $('#addressInp').val();

    //NYT AJAX request
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url+="?"+$.param({
      'api-key':"1a91a51531bf4df3a90a2b446d8ee0b6";
      'q': address;
      'sort': "newest";
    })

    $.getJSON(urlNYTAJAX,function(data){
      var items=[];
      $.each(data, function(key,val){
        items.push("<li id='>"+key+"'>'"+val+"</li>");
      })

      $("<ul/>",{
        "class":"my-new-list";
        html: items.join("");
      }).appendTo("body");
    }).error(function(e){
      $nytHeaderElem.text("NYT Article could not be found");
    });
}
