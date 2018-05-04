let articles = [];
let begin_date = "20170101";
let end_date = "20170110";
let query = "Japan";


let call = function(){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c204dd8651ea440891e9a3d276a6eb6f",
      'begin_date': begin_date,
      'end_date': end_date,
      'q': query
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

    article.append(snippet);

    $("#test").append(article);
}

let pinAllArticles = function(){
    for(i=0; i < articles.length; i++){
        let article = $("<div>");
        article.html(articles[i].headline.main);
        let snippet = $("<div>");
        snippet.addClass("snippet");
        snippet.text(articles[n].snippet);
        $("#test").append(article);

    }

}