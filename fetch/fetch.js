/* globals fetch: false, Promise: true*/
Promise = require("promise");
require("whatwg-fetch");

var page = tabris.create("Page", {
  title: "Fetching ChargeStation-Data...",
  topLevel: true
});

var textView = undefined;

var createTextView = function(text) {

  if (textView == undefined){
      textView = tabris.create("TextView", {
      text: text,
      markupEnabled: true,
      layoutData: {left: 12, right: 12, top: "prev() 12"}
      }).appendTo(page);    
  }else{
    textView.set("text", text)
  }


};


function enableTimerStart() {
  var count = 0;

  fetch("http://www.swarco-cpo.de:8090/statuspoints").then(function(response) {  
    console.log("Count: " + count);
    count ++;
    return response.json();

  }).then(function(json) {

    var datas3 = json.value.ChargePointStatus;
    for (var i = 0; i < datas3.length; i++) {
      var data = datas3[i];
      
      if (data.chargePointId == 31624)
      {

        var str = "ChargePointId: " + JSON.stringify(data.chargePointId) + " ---- Status: " + JSON.stringify(data.status);
        createTextView(str);      
      }
    };
  });
}


var str1 = "ChargePointId: XXXXX" + " ---- Status: undefiniert";
createTextView(str1)
setInterval(enableTimerStart, 10000);

page.open();