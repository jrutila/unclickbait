$(function(){
 var link = chrome.extension.getBackgroundPage().selectedLink;
 $("#text").val(link.text);
 $("#originalText").val(link.text);
});
$(function(){
 var currentUrl = "";
 chrome.tabs.getSelected(function(tab) { currentUrl = tab.url; });
 $("button").click(function(){
  // data is something like this:
  // {
  //  url: the url of the page (can be an array or urls)
  //  href: (optional) where did the user get here
  //  originalText: (optional) what was in the original link
  //  text: the proposed new title
  // }
  var link = chrome.extension.getBackgroundPage().selectedLink;
  var data = {};
  data.ref = link.ref;
  data.originalText = $("#originalText").val();
  data.text = $("#text").val();
  if (link.url != currentUrl)
    data.url = [ link.url, currentUrl ];
  else
    data.url = link.url;
  console.log(data);
  var xhr = new XMLHttpRequest();
  // TODO: Get the url from options or something
  xhr.open("POST", "https://unclickbait-jrutila.c9.io/clickbait/add", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function(msg) {
    if (xhr.readyState == 4) {
      alert("New UnClickbait title added! Thank you!");
    }
    // TODO: Error case
  };
  xhr.send(JSON.stringify(data));
 });
});
