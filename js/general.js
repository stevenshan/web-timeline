// settings
var RANDOM_COLORS = true; // randomize color of timeline labels
var DEFAULT_COLOR = 0; // only works if RANDOM_COLORS is false
var RANDOM_SIDES = true; // randomize side timeline events are on
var CHRONOLOGICAL = true; // false for oldest first; true for newest first
var DIVIDERS = true; // false for no year dividers; true for year dividers

function finishedLoading()
{
	document.body.removeChild(document.getElementById("loadingMessage"));
}

var colors = ["#fcdd75", "#ca5454", "#e8a040", "#ebc59c", "#7e92b9"];

// get a random integer in the range [0, max)
function randint(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

// get a random color
function randColor() 
{
	if (RANDOM_COLORS) return colors[randint(colors.length)];
	else
		return colors[DEFAULT_COLOR];
}

// function to format date to Month Date, Year
function formatDate(date) 
{
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

// function to convert date strings to date objects
function convertDates(data)
{
	for (i = 0; i < data.length; i++)
	{
		data[i]["date"] = new Date(data[i]["date"]);
	}	
	return data;
}

$(function(){
	finishedLoading();

	// get window dimensions
	windowDim = {x: $(window).width(), y: $(window).height()};

	// counter to make sure no more than 2 adjacent events go to same side
	var counter = 0;

	// asynchronous call to retrieve data
	$.getJSON("projects.json", function(data){
		// change date strings to date objects
		data = convertDates(data);

		// sort events by date
		data.sort(function(a, b){
			return (CHRONOLOGICAL ? a["date"] < b["date"] :
									a["date"] > b["date"]);		
		});

		if (windowDim.x >= 900) // if desktop layout
		{
			var container = $("#container");
			container.append("<div id=\"timeline\"></div>")

			var lastYear = null;

			// loop on each event to be added
			data.forEach(function(e){
				if (RANDOM_SIDES)
				{
					// random int to decide which side to put event on
					var i = randint(2);

					// ensure event isn't put on same side 3 times in a row
					if (counter > 0 && i > 0) counter += 1;
					else if (counter < 0 && i == 0) counter -= 1;
					else counter = (i * 2 - 1);
					if (Math.abs(counter) >= 3)
					{
						// flip i
						i = (i == 0 ? 1 : 0);
						counter = (i * 2 - 1);
					}
				}
				else
				{
					i = counter;	
					counter += 1;
				}

				var dataClass = (i % 2 == 0 ? 
								 "leftInfo" : "rightInfo")

				// generate html code for links section
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
						formatDate(e["date"]) + "</div>" + 
						"<h1>" + e["name"] + "</h1>" +
						"<p>" + e["description"] + "</p>" + 
						links +
						"</div>" +
						"</div>";

				// add generated html code to document
				if (DIVIDERS && e["date"].getFullYear() != lastYear)
				{
					lastYear = e["date"].getFullYear();	
					container.append("<div class=\"divider level\" style=\"" + 
						"background: " + randColor() + "\">" +
						lastYear + "</div>");
				}

				container.append(elem);

			});
		}
	})
});