var remote = require('remote');
var clipboard = require('clipboard');
var os = require('os');

var removeList = ["gb","gba","gt-ft-res","gt-appbar","gt-ft", "gt-community-promo"];
removeList.forEach(function(id) {
	$("#"+id).remove();
});

var simulateClick = function(element) {
   ["mouseover", "mousedown", "mouseup", "click"].forEach(function(event){
      mouseEvent = document.createEvent("MouseEvents");  
      mouseEvent.initMouseEvent(event, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);  
      element.dispatchEvent(mouseEvent);
      
  });
}

$('body').keydown(function(e){

	var bindKey = os.type() === 'Darwin' ? e.metaKey : e.ctrlKey;
	var src = document.getElementById("source");
	var esc = 27;
	var s = 83;
	var p = 80;
	var d = 68;
	var i = 73;

	if (e.keyCode === esc) {
		remote.getCurrentWindow().hide()
	}
	if ((bindKey == true ) && (e.keyCode === s)) {
		simulateClick(document.getElementById("gt-swap"));
	}
	if ((bindKey == true ) && (e.keyCode === p)) {
		src.value = '';
		src.value = clipboard.readText();
	}
	if ((bindKey == true ) && (e.keyCode === d)) {
		src.value = '';
	}
	if ((bindKey == true ) && (e.keyCode === i)) {
		simulateClick(document.getElementById("spelling-correction").children[0]);
	}
});
