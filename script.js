// alert("script.js is linked!");

//set up AJAX call to get current newswire from the Times
//limit it by the last 24 hours //---> this could change to 48 or no limit

//the default returned is 20, so ??
//parse that data to pull the section
//parse the data to pull the title, abstract, and caption from the multimedia image


//Alchemy API key = 

var sectionIcon = $('#icon');
var $linked = $(articlelink);
var $title = $('#Title');

$.ajax({
  url: 'https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=panda&return=enriched.url.url,enriched.url.title&apikey=APIKEY',
  method: "GET",
  success: function(data) {
    //append values to DOM
    var articleTitle = JSON.stringify(data['result']['docs'][0]['source']['enriched']['url']['title']);
    var articleLink = JSON.stringify(data['result']['docs'][0]['source']['enriched']['url']['url']);
    $title.append(articleTitle);
    $linked.append(articleLink);
    console.log(articleTitle + ' Read more here: ' + articleLink);
  }
});



//NYT API
// var sectionIcon = $('#icon');
//
// $.ajax({
//   url: 'http://api.nytimes.com/svc/news/v3/content/all/all/.json?api-key=API',
//   method: "GET",
//   success: function(data) {
//     var section = JSON.stringify(data['results'][0]['section']);
//     var title = JSON.stringify(data['results'][0]['title']);
//     var abstract = JSON.stringify(data['results'][0]['abstract']);
//     var caption = JSON.stringify(data['results'][0]['multimedia'][0]['caption']);
//
//     //append values to DOM
//     sectionIcon.append(section);
//     console.log(section, title, abstract, caption);
//   }
// });
