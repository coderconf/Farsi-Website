$(document).foundation();


      var map_canvas = document.getElementById('map');
      var myLatlng = new google.maps.LatLng(35.701049, 51.403818);
      var MarLatlng = new google.maps.LatLng(35.701049, 51.403818);
      var styleArray = [
          {
              "featureType": "water",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#b5cbe4"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "stylers": [
                  {
                      "color": "#efefef"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#83a5b0"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#bdcdd3"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#e3eed3"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": 33
                  }
              ]
          },
          {
              "featureType": "road"
          },
          {
              "featureType": "poi.park",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "road",
              "stylers": [
                  {
                      "lightness": 20
                  }
              ]
          }
      ]
      var map_options = {
        center: myLatlng,
        navigationControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        disableDefaultUI: true,
        streetViewControl: false,
        disableDoubleClickZoom: false,
        zoomControl: false,
        styles: styleArray,
        draggable: true,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(map_canvas, map_options)
      var marker = new google.maps.Marker({
          position: MarLatlng,
          map: map,
          title:"مرکز همایش‌های صدرا :: Coder Conf",
          url: 'https://goo.gl/maps/Xc6kyhyBR292',
          icon: 'assets/img/map-marker.png',
      });

    google.maps.event.addListener(marker, 'click', function() {
      window.open(marker.url, '_blank');
    });


(function() {

  var xmlhttp = new XMLHttpRequest();
  var url = "https://api.evand.ir/events/coderconf/attendees/public?sort=-created_at&per_page=-1";

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = JSON.parse(xmlhttp.responseText);
          coderReg(myArr);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


  function coderReg(arr) {
      var out = "";
      var i;
      for(i = 0; i < arr.data.length; i++) {
          out += '<img src="https://gravatar.com/avatar/' + arr.data[i].email_md5 + '?s=60&d=mm"'
          +' alt="'+ arr.data[i].first_name + ' ' + arr.data[i].last_name +'"'
          +' title="'+ arr.data[i].first_name + ' ' + arr.data[i].last_name +'">';
      }
      out += '<a href="https://evand.ir/events/coderconf" target="_blank"><img src="http://coderconf.org/fa/assets/img/join.jpg" ></a>';
      document.getElementById("coderconf-reg").innerHTML = out;
  }

})();