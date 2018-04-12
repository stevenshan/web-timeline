function finishedLoading()
{
	document.body.removeChild(document.getElementById("loadingMessage"));
}

$(function(){
	finishedLoading();

	windowDim = {x: $(window).width(), y: $(window).height()};

	$.getJSON("projects.json", function(data){
		if (windowDim.x >= 900) // if desktop layout
		{
			var container = $("#container");
			container.append("<div id=\"timeline\"></div>")
			data.forEach(function(e){
				elem = "<div class=\"level timelineElement\">test</div>"
				container.append(elem);
				container.append("<div class=\"divider timelineElement\">2016</div>");
			});
		}
	})
});