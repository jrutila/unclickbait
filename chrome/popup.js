$(function(){
 var link = chrome.extension.getBackgroundPage().selectedLink;
 $("#text").val(link.text);
});
$(function(){
 $("button").click(function(){
  console.log(chrome.extension.getBackgroundPage().selectedLink, $("#text").val());
  alert("inspect popup, and check console");
 });
});
