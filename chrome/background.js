var selectedLink = null;

var links = {};
function updateLinks(tabId)
{
 chrome.tabs.sendRequest(tabId, {}, function(l) {
  if (typeof l === "undefined") {
   delete links[tabId];
  } else {
   links[tabId] = l;
  }
 });
}

function updateSelected(tabId)
{
 if (typeof ref_data[tabId] === "undefined")
 {
  chrome.pageAction.hide(tabId);
  return;
 }
 chrome.pageAction.show(tabId);
 chrome.pageAction.setTitle({ tabId: tabId, title: ref_data[tabId].text });
 selectedLink = ref_data[tabId];
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
 if (change.status == "complete") {
  updateLinks(tabId);
  updateSelected(tabId);
 }
});
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
 updateLinks(tabs[0].id);
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
 updateSelected(tabId);
});

chrome.webNavigation.onBeforeNavigate.addListener(function(e){
 if (e.frameId === 0 && typeof ref_data[e.tabId] !== "undefined" && e.url !== ref_data[e.tabId].url)
 {
  delete ref_data[e.tabId];
 }
 if (typeof links[e.tabId] !== "undefined")
 links[e.tabId].forEach(function(v){
  if (v.url != e.url) return;
  ref_data[e.tabId] = v;
  updateSelected(e.tabId);
 });
});

var ref_data = {};
chrome.webNavigation.onCreatedNavigationTarget.addListener(function(e){
 chrome.tabs.sendRequest(e.sourceTabId, {}, function(l) {
  if (typeof l === "undefined") return;
  l.forEach(function(v){
   if (v.url == e.url)
   {
    ref_data[e.tabId] = v;
    updateSelected(e.tabId);
   }
  });
 });
});
