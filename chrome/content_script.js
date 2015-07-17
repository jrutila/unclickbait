if (window == top) {
 chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
  sendResponse(findLinks_all());
 });
}

var findLinks_all = function() {
 var links = [];
 $("a").each(function(){
  links.push({
   ref: document.location.href,
   text: $(this).text(),
   url: $(this).prop("href")
  });
 });
 return links;
};

var findLinks = function() {
 var link_selector = {
  "www.ampparit.com": "a.news-item-headline"
 };
 if (typeof link_selector[window.location.hostname] === "undefined") return;

 var links = [];
 $(link_selector[window.location.hostname]).each(function(){
  links.push({
   ref: document.location.href,
   text: $(this).text(),
   url: $(this).attr("href")
  });
 });
 return links;
};
