$(function(){
 var link = chrome.extension.getBackgroundPage().selectedLink;
 $("#text").val(link.text);
 $("#originalText").val(link.text);
});
$(function(){
 $("button").click(function(){
  // data is something like this:
  // {
  //  url: the url of the page
  //  href: (optional) where did the user get here
  //  originalText: (optional) what was in the original link
  //  text: the proposed new title
  // }
  var data = chrome.extension.getBackgroundPage().selectedLink;
  data.originalText = $("#originalText").val();
  data.text = $("#text").val();
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
