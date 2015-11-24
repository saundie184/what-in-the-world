// alert("script.js is linked!");

var sectionIconMap = {
  'Environment': 'fa fa-tree',
  'Business': 'fa fa-briefcase',
  'news': 'fa fa-newspaper-o',
  'Film': 'fa fa-video-camera',
  'Global': 'fa fa-globe',
  'Music': 'fa fa-music',
  'Life and style': 'fa fa-heart',
  'Travel': 'fa fa-plane',
  'Sport': 'fa fa-futbol-o',
  'Football': 'fa fa-futbol-o',
  'Media': 'fa fa-book'

}


var table = $('.searched');

var goButton = $('button');
$(goButton).on('click', function(event) {
  event.preventDefault();
  var userSearch = $('#searchbar').val();
  $('#searchTerm').text("\" " + userSearch + "\" ");
  // console.log(userSearch);

  //write a for loop that goes through each article that is called
  //Add the search term  and date to the URL when a user inputs the data
  $.ajax({
    url: 'http://content.guardianapis.com/search?q=' + userSearch + '&order-by=newest&api-key=APIKEY',
    method: "GET",
    success: function(data) {
      console.log(data);
      for (var i = 0; i < 10; i++) {

        var article = (data['response']['results'][i]['webTitle']);
        var url = (data['response']['results'][i]['webUrl']);
        var section = (data['response']['results'][i]['sectionName']);
        var pubDate = (data['response']['results'][i]['webPublicationDate']).slice(0, -10);
        console.log(pubDate);

        var table = $('.searched');
        var row = $('<tr></tr>');
        $(table).append(row);

        var newArray = section.split(" ");
        var match = false;
        // console.log(newArray);

        //use a for..in to check all keys in the object and && var match;
        for (var sectionName in sectionIconMap) {
          // console.log(sectionIconMap[sectionName]);
          if (newArray.indexOf(sectionName) !== -1) {
            var sectionIcon = $('<td class=newsSection><i class=' + "\" " + sectionIconMap[sectionName] + "\" " + '></i>' +"  "+ section + '</td>');
            $(row).append(sectionIcon);
          }
        }


        //if else is match

        // if (newArray.indexOf('Environment') !== -1) {
        //   var sectionIcon = $('<td><i class="fa fa-briefcase"></i>' + section + '</td>');
        //   $(row).append(sectionIcon);
        // } else {
        //   var sectionIcon = $('<td><i class="fa fa-bookmark"></i>' + section + '</td>');
        //   $(row).append(sectionIcon);
        // }
        var cell = $('<td class=newsSection><a href= ' + url + ' >' + article + ' </a></td>');
        $(row).append(cell);
        var date = $('<td class=newsSection>'+ pubDate + '</td>');
        $(row).append(date);
      }
    }
  });
});

//write a map
