// alert("script.js is linked!");

//create an AJAX call by plugging in

//Alchemy API key

//Gather the input from the search bar and update the html
var table = $('.searched');

var goButton = $('button');
$(goButton).on('click', function(event) {
  event.preventDefault();
  var userSearch = $('#searchbar').val();
  $('#searchTerm').text("\" " + userSearch + "\" ");
  // console.log(userSearch);
  // make today's date into the correct format to add to the URL

  var today = new Date();
  var day = today.getDate();
  var year = today.getFullYear();
  var month = (today.getMonth()) + 1;
  //write a function that will concatate my data
  var dateArray = [year, month, day, 'T000000'];
  var dateInput = dateArray.join('');
  console.log(dateInput);

  // var sectionIcon = $('#icon');
  // var $linked = $(articlelink);
  // var $title = $('#Title');

  //write a for loop that goes through each article that is called
  //Add the search term  and date to the URL when a user inputs the data

  $.ajax({
    url: 'https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=10&q.enriched.url.enrichedTitle.keywords.keyword.text=' + userSearch + '&q.enriched.url.publicationDate.date=20151122T000000&return=enriched.url.url,enriched.url.publicationDate,enriched.url.title&apikey=APIKEY',
    method: "GET",
    success: function(data) {
      console.log(data);
      for (var i = 0; i < 10; i++) {
        for (var i = 0; i < 10; i++) {

          var article = JSON.stringify(data['result']['docs'][i]['source']['enriched']['url']['title']);
          var url = JSON.stringify(data['result']['docs'][i]['source']['enriched']['url']['url']);

          var table = $('.searched');
          var row = $('<tr></tr>');
          var cell = $('<td></td>');
          var cellLink = $('<td><a></a></td>');
          $(table).append(row);
          $(row).append(cell);
          $(row).append(cellLink);
          cell[0].innerText = article;
          cellLink[0].innerText = url;
        }
      }

      //create a loop that iterates through and creates a DOM node for each article

      //append values to DOM

    }
  });
});
