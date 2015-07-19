if (window == top) {
 chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
   var link_selector = {
    "www.ampparit.com": "a.news-item-headline, a.__sidebar-item"
   };

   var sele = link_selector[window.location.hostname];

   if (typeof sele === "undefined")
    sele = "a";

  var urls = [];
  $(sele).each(function() {
    var href = $(this).attr("href");
    if (! (/^http/).test(href))
      href = window.location.origin + href;
    urls.push(href);
  });
  
  console.log(urls);
  var data = { url: urls };
  var xhr = new XMLHttpRequest();
  // TODO: Get the url from options or something
  xhr.open("POST", "https://unclickbait-jrutila.c9.io/clickbait/search", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function(msg, res) {
    if (xhr.readyState == 4) {
      var res = JSON.parse(xhr.responseText);
      for (var r in res) {
        var cb = res[r];
        var $elem = $("[href='"+cb.url.replace(window.location.origin, "")+"'], [href='"+cb.url+"'] ");
        var orig = $elem.html();
        // TODO: Replace only the origin text and not for example the time info
        $elem.html(cb.titles[0].text);
        $elem.append("<img src='"+chrome.extension.getURL("images/clickbait.png")+"'/>");
      }
      console.log(res);
    }
    // TODO: Error case
  };
  xhr.send(JSON.stringify(data));

  sendResponse(findLinks(sele));
 });
}

var findLinks = function(sele) {
 var links = [];
 $(sele).each(function(){
  links.push({
   ref: document.location.href,
   text: $(this).text(),
   url: $(this).attr("href")
  });
 });
 return links;
};
