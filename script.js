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
  'Sport': 'fa fa-trophy',
  'Football': 'fa fa-futbol-o',
  'Media': 'fa fa-book',
  'Society': 'fa fa-users',
  'Politics': 'fa fa-university',
  'Education': 'fa fa-graduation-cap',
  'Fashion': 'fa fa-camera-retro',
  'Television': 'fa fa-television',
  'Culture': 'fa fa-flag',
  'Books': 'fa fa-book',
  'Art': 'fa fa-paint-brush',
  'Network': 'fa fa-comments',
  'Opinon': 'fa fa-bullhorn'

}

var table = $('.searched');

var goButton = $('button');
$(goButton).on('click', function(event) {
  event.preventDefault();
  $('.searched').empty();
  $('.results').empty();

  var heading = $('<h2>Here\'s what\'s happening around the world with <span class=text-primary id=searchTerm></span>:</h2>')
  $('.results').append(heading);

  var userSearch = $('#searchbar').val();
  $('#searchTerm').text("\"" + userSearch + "\" ");
  // console.log(userSearch);

  var table = $('.searched');
  var tableHead = $('<thead><tr></tr></thead>');
  $(table).append(tableHead);

  //write a for loop that goes through each article that is called
  //Add the search term  and date to the URL when a user inputs the data
  $.ajax({
    url: 'http://content.guardianapis.com/search?q=' + userSearch + '&order-by=newest&api-key=',
    method: "GET",
    success: function(data) {
      if ((data['response']['results']).length === 0) {
        var errorRow = $('<tr><td id=errortag>Your search term was not found in any current news stories. Try using a different search term.</td></tr>');
        $(table).append(errorRow);
      } else {
        var sectionTitle = $('<th class= headings>Section</th>');
        var articleTitle = $('<th class= headings>Article Title</th>');
        var pubTitle = $('<th class= headings>Publication Date</th>');
        $(tableHead).append(sectionTitle);
        $(tableHead).append(articleTitle);
        $(tableHead).append(pubTitle);

        for (var i = 0; i < 10; i++) {
          var article = (data['response']['results'][i]['webTitle']);
          var url = (data['response']['results'][i]['webUrl']);
          var section = (data['response']['results'][i]['sectionName']);
          if (section === 'Comment is free') {
            section = 'Opinon'
          }

          var pubDateData = (data['response']['results'][i]['webPublicationDate']).slice(0, -10);
          var dateArray = pubDateData.split('-')
          var nextdateArray = [dateArray[1], dateArray[2]];
          nextdateArray.push(dateArray[0])
          var pubDate = nextdateArray.join('-');

          var today = new Date();
          var day = today.getUTCDate();
          var month = today.getMonth() + 1;
          var year = today.getFullYear();
          if(pubDate === (month + "-" + day + "-" + year)){
            pubDate = 'Today!';
          }

          var row = $('<tr></tr>');
          $(table).append(row);

          var newArray = section.split(" ");
          var match = false;

          for (var sectionName in sectionIconMap) {
            if (newArray.indexOf(sectionName) !== -1) {
              match = true;
              var sectionIcon = $('<td class=section><i class=' + "\" " + sectionIconMap[sectionName] + " fa-2x \" " + '></i>' + "  " + section + '</td>');
              $(row).append(sectionIcon);
            }
          }
          if (match !== true) {
            var sectionIcon = $('<td class=section><i class="fa fa-bookmark fa-2x"></i>' + "  " + section + '</td>');
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
    }
  });
});
