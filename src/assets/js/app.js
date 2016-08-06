$(document).foundation();

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
          out += '<img src="https://gravatar.com/avatar/' + arr.data[i].email_md5 + '?s=42&d=mm"'
          +' alt="'+ arr.data[i].first_name + ' ' + arr.data[i].last_name +'"'
          +' title="'+ arr.data[i].first_name + ' ' + arr.data[i].last_name +'">';
      }
      out += '<a href="https://evand.ir/events/coderconf" target="_blank"><img src="http://coderconf.org/fa/assets/img/join.jpg" width="42" height="42"></a>';
      document.getElementById("coderconf-reg").innerHTML = out;
  }

})();


    var xmlhttp = new XMLHttpRequest();
    var url = "assets/data/confirmed-article.txt";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            gooyaSites(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function gooyaSites(arr) {
        var out = "";
        var i;
        for(i = 0; i<arr.length; i++) {

            if ((arr.length-1) == i) {
              
              out += '<div class="columns end">'

            } else {
              
              out += '<div class="columns">'

            }



          out += '<div class="row small-collapse medium-collapse large-collapse confirmed-article">'
              +'<div class="columns small-2">'
                +'<img src="https://gravatar.com/avatar/' + arr[i].emailhash + '?s=80&amp;d=mm" alt="' + arr[i].author + '" title="' + arr[i].author + '"><br><small class="article-tag ' + arr[i].tag + '">' + arr[i].tag + '</small> </div>'
              +'<div class="columns small-10 article-info">'
                +'<small class="article-author">' + arr[i].author + '</small><p>' + arr[i].articlename + '</p></div>'
          +'</div>'
        +'</div>';
        }
        document.getElementById("confirmedArticle").innerHTML = out;
    }
