// alert("script.js is linked!");

var sectionIconMap = {
  'Environment': 'fa fa-tree',
  'Business': 'fa fa-briefcase',
  'news': 'fa fa-newspaper-o',
  'Film': 'fa fa-video-camera',
  'Global': 'fa fa-globe',
  'Music': 'fa fa-music',
  'Life': 'fa fa-heart',
  'Travel': 'fa fa-plane',
  'Sport': 'fa fa-futbol-o',
  'Football': 'fa fa-futbol-o',
  'Media': 'fa fa-book',
  'Society': 'fa fa-users',
  'Politics': 'fa fa-university',
  'Education': 'fa fa-graduation-cap',
  'Fashion': 'fa fa-camera-retro'

}


var table = $('.searched');

var goButton = $('button');
$(goButton).on('click', function(event) {
  event.preventDefault();
  $('.searched').empty();
  var userSearch = $('#searchbar').val();
  $('#searchTerm').text("\" " + userSearch + "\" ");
  // console.log(userSearch);

  var table = $('.searched');
  var tableHead = $('<thead><tr></tr></thead>');
  $(table).append(tableHead);

  var sectionTitle = $('<th class=newsSection>Section</th>');
  var articleTitle = $('<th class=newsSection>Article Title</th>');
  var pubTitle = $('<th class=newsSection>Publication Date</th>');
  $(tableHead).append(sectionTitle);
  $(tableHead).append(articleTitle);
  $(tableHead).append(pubTitle);

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

        var row = $('<tr></tr>');
        $(table).append(row);

        var newArray = section.split(" ");
        var match = false;
        // console.log(newArray);

        //use a for..in to check all keys in the object and && var match;
        for (var sectionName in sectionIconMap) {
          // console.log(sectionIconMap[sectionName]);
          if (newArray.indexOf(sectionName) !== -1) {
            match = true;
            var sectionIcon = $('<td class=newsSection><i class=' + "\" " + sectionIconMap[sectionName] + " fa-2x \" " + '></i>' + "  " + section + '</td>');
            $(row).append(sectionIcon);
          }
        }
        if (match !== true) {
            var sectionIcon = $('<td><i class="fa fa-bookmark fa-2x"></i>' + "  " + section + '</td>');
            $(row).append(sectionIcon);
        }
        var cell = $('<td class=newsSection><a href= ' + url + ' >' + article + ' </a></td>');
        $(row).append(cell);
        var date = $('<td class=newsSection>' + pubDate + '</td>');
        $(row).append(date);
      }
      var guardian = $('<p class=marg-top>Content provided by <a href="http://www.theguardian.com/us">The Guardian</a></p>');
      $(table).append(guardian);
    }
  });
});

//write a map
