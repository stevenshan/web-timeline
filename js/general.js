function finishedLoading()
{
	document.body.removeChild(document.getElementById("loadingMessage"));
}

var colors = ["#fcdd75", "#ca5454", "#e8a040", "#ebc59c", "#7e92b9"];

function randint(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function randColor() {
	return colors[randint(colors.length)];
}

$(function(){
	finishedLoading();

	windowDim = {x: $(window).width(), y: $(window).height()};

	var counter = 0;
	$.getJSON("projects.json", function(data){
		if (windowDim.x >= 900) // if desktop layout
		{
			var container = $("#container");
			container.append("<div id=\"timeline\"></div>")

			data.forEach(function(e){
				var dataClass = (counter % 2 == 0 ? "leftInfo" : "rightInfo")

				elem = "<div class=\"level event\">" + 
						"<div class=\"infoDot\" style=\"background : " +
						randColor() + "\"></div>" + 
						"<div class=\"info " + dataClass + "\">" + 
						"test" + 
						"</div>" +
						"</div>"
				container.append(elem);
				container.append("<div class=\"divider level\" style=\"" + 
					"background: " + randColor() + "\">2016</div>");

				counter += 1;
			});
		}
	})
});