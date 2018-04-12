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

function formatDate(date) {
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return monthNames[monthIndex] +  ' ' + day + ', ' + year;
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
				var date = new Date(e["date"]);
				var dataClass = (counter % 2 == 0 ? "leftInfo" : "rightInfo")

				links = "<h3>"
				e["links"].forEach(function(link){
					links += "<span><a href=\"https://" + link[1] + "\">" + 
							 link[0] + "</a></span>";
				});
				links += "</h3>";

				elem = "<div class=\"level event\">" + 
						"<div class=\"infoDot\" style=\"background : " +
						randColor() + "\"></div>" + 
						"<div class=\"info " + dataClass + "\">" + 
						"<div class=\"infoDate\">" +
						formatDate(date) + "</div>" + 
						"<h1>" + e["name"] + "</h1>" +
						"<p>" + e["description"] + "</p>" + 
						links +
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