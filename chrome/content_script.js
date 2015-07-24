if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    var sele = undefined;
    var xhr = new XMLHttpRequest();
    // TODO: Get the url from options or something
    xhr.open("GET", "https://unclickbait-jrutila.c9.io/selectors.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function(msg, res) {
      if (xhr.readyState == 4) {
        var link_selector = JSON.parse(xhr.responseText);
        var sele = link_selector[window.location.hostname];

         console.log("SELE: "+sele);
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
        var xh = new XMLHttpRequest();
        // TODO: Get the url from options or something
        xh.open("POST", "https://unclickbait-jrutila.c9.io/clickbait/search", true);
        xh.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xh.onreadystatechange = function(msg, res) {
          if (xh.readyState == 4) {
            var res = JSON.parse(xh.responseText);
            for (var r in res) {
              var cb = res[r];
              var $elem = $("[href='"+cb.url.replace(window.location.origin, "")+"'], [href='"+cb.url+"'] ");
              // TODO: Replace only the origin text and not for example the time info
              var replText = cb.titles[0].text + "<img src='"+chrome.extension.getURL("images/clickbait.png")+"'/>";
              var origText = cb.titles[0].originalText;

              var none = true;

              $elem.each(function(i) {
                if ($(this).html().search(origText) > -1) {
                  none = false;
                  var currText = $(this).html();
                  $(this).html(currText.replace(origText, replText));
                }
              });

              if (none)
                $elem.html(replText);
            }
            console.log(res);
          }
          // TODO: Error case
        };
        xh.send(JSON.stringify(data));

        sendResponse(findLinks(sele));

      }
    // TODO: Error case
    };
    xhr.send(null);
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
