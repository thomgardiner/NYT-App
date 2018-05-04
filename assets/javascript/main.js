let articles = [];
let begin_date = "20170101";
let end_date = "20170110";
let query = "Japan";
let records = 10;
let offset = 0;

let call = function(){
    articles = [];
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c204dd8651ea440891e9a3d276a6eb6f",
      'begin_date': begin_date,
      'end_date': end_date,
      'q': query, 
      'offset': offset,
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result.response);
      console.log(result.response.docs.length);
      for(i=0; i < result.response.docs.length; i++){
        articles.push(result.response.docs[i]);
      }

    }).fail(function(err) {
      throw err;
    });
}

let pinArticle = function(n){
    let article = $("<div>");
    article.addClass("article");
    article.html(articles[n].headline.main);

    let snippet = $("<div>");
    snippet.addClass("snippet");
    snippet.text(articles[n].snippet);

    let pubDate = $("<div>");
    pubDate.addClass("date");
    pubDate.text(articles[n].pub_date);

    let link = $("<a>");
    link.attr("href", articles[n].web_url);

    article.append(snippet);
    article.append(link);
    article.append(pubDate);

    $("#article-container").append(article);
}

let pinAllArticles = function(){
    for(i=0; i < records; i++){
        let article = $("<div>");
        article.addClass("article");
        article.html(articles[i].headline.main);
        let snippet = $("<div>");
        snippet.addClass("snippet");
        snippet.text(articles[i].snippet);
        let link = $("<div>");
        link.addClass("link");
        link.html('<a href="' + articles[i].web_url + '" target="_blank"> Read Article </a>');
        let pubDate = $("<div>");
        pubDate.addClass("date");
        pubDate.text(articles[i].pub_date);
    
        article.append(snippet);
        article.append(link);
        article.append(pubDate);


        $("#article-container").append(article);

    }

}

const checkDate = function(){
    parseInt();

}

const clearArticles = function(){
    $(".article").remove();
}

const setStartDate = function(){
    begin_date = $("#start-date").val();
}

const setResultNumber = function(){
    results = $("#result-num").val();
}


const setEndDate = function(){
    end_date = $("#end-year").val();
}

const setQuery = function(){
    query = $("#search-term").val();
}

const populateVariables = function(){
    setQuery();
    setStartDate();
    setEndDate();
    setResultNumber();
 }

 const clearInputs = function(){

    $("#search-term").val("");
    $("#start-date").val("");
    $("#end-year").val("");


 }

$(document).ready(function() {
    
    $("body").on("click", "#search-btn", function(){
        populateVariables();
        call();
        setTimeout(pinAllArticles, 1000);
        clearInputs();
    })
    $("body").on("click", "#clear-btn", function(){
        clearArticles();
    })
});
