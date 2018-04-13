// settings
var COLOR_BY_YEAR = true; /* make all labels for the same year the same
							 color; overwrites RANDOM_COLORS */
var RANDOM_COLORS = true; // randomize color of timeline labels
var DEFAULT_COLOR = 0; // only works if RANDOM_COLORS is false
var RANDOM_SIDES = false; // randomize side timeline events are on
var CHRONOLOGICAL = true; // false for oldest first; true for newest first
var DIVIDERS = true; // false for no year dividers; true for year dividers

// https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

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
		var original = data[i]["date"]
		data[i]["date"] = new Date(original);
		if ("onlyYear" in data[i] && data[i]["onlyYear"])
		{
			data[i]["sDate"] = original;
			data[i]["date"].setDate(data[i]["date"].getDate() + 1);
		}
		else
		{
			data[i]["sDate"] = formatDate(data[i]["date"]);
		}
	}	
	return data;
}

$(function(){

	var container = $("#container");

	// get window dimensions
	windowDim = {x: $(window).width(), y: $(window).height()};

	isMobile = isMobile || windowDim.x <= 950;

	if (isMobile)
	{
		$("body").addClass("mobile");
	}	

	// counter to make sure no more than 2 adjacent events go to same side
	var counter = 0;

	var yearCounter = -1;

	// asynchronous call to retrieve data
	$.getJSON("projects.json", function(data){
		// change date strings to date objects
		data = convertDates(data);
		console.log(data);

		// sort events by date
		data.sort(function(a, b){
			return (CHRONOLOGICAL ? a["date"] < b["date"] :
									a["date"] > b["date"]);		
		});

		container.append("<div id=\"timeline\"></div>");

		var lastYear = null;

		var maxDateWidth = 99999;

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
			var dateClass = (i % 2 == 0 ? 
							 "leftDate" : "rightDate")

			// generate html code for links section
			links = "<h3>"
			e["links"].forEach(function(link){
				links += "<span><a href=\"https://" + link[1] + "\">" + 
						 link[0] + "</a></span>";
			});
			if (e["links"].length == 0)
			{
				links += "None";
			}
			links += "</h3>";

			dividerElem = false;
			// add generated html code to document
			if (e["date"].getFullYear() != lastYear)
			{
				yearCounter += 1;
				lastYear = e["date"].getFullYear();	
				var dividerColor = randColor();

				if (COLOR_BY_YEAR)
				{
					dividerColor = colors[yearCounter];
				}

				var dividerElem = "<div class=\"divider level\" style=\"" + 
					"background: " + dividerColor + "\" id=\"" + 
					lastYear + "\">" +
					lastYear + "</div>";
			}

			var eventColor = randColor();

			if (COLOR_BY_YEAR)
			{
				eventColor = colors[yearCounter];
			}

			if (e["description"] == "" && e["links"].length == 0)
			{
				elem = "<div class=\"level event smallEvent\">" + 
						"<div class=\"infoDot\" style=\"background : " +
						eventColor + "\">" + 
						"<div class=\"infoDate " +
						dateClass + "\" style=\"background: " +
						eventColor + "\">" +
						e["sDate"] + "</div>" + 
						"</div>" + 
						"<div class=\"info " + dataClass + "\">" + 
						"<h1>" + e["name"] + "</h1>" +
						"</div>" +
						"</div>";
			}
			else
			{
				elem = "<div class=\"level event\">" + 
						"<div class=\"infoDot\" style=\"background : " +
						eventColor + "\">" + 
						"<div class=\"infoDate " +
						dateClass + "\" style=\"background: " +
						eventColor + "\">" +
						e["sDate"] + "</div>" + 
						"</div>" + 
						"<div class=\"info " + dataClass + "\">" + 
						"<h1>" + e["name"] + "</h1>" +
						"<p>" + e["description"] + "</p>" + 
						links +
						"</div>" +
						"</div>";
			}

			if (DIVIDERS && dividerElem !== false)
			{
				container.append(dividerElem);
			}

			elem = $(elem)

			container.append(elem);

			maxDateWidth = Math.min(maxDateWidth, 
									elem.find(".infoDate").offset().left);

		});

		// do some visual adjustments for mobile
		if (isMobile)
		{
			// balance container alignment to center content
			// calculate amount of unused space next to date labels
			$("#body").css("marginLeft", 
				(maxDateWidth - container.offset().left) / -2.0);
		}

		finishedLoading();
	});
});