var req;
var curCell = -1;
var prevClick = -1;
//var curMoves = 0;
var celltds = new Array(width*height);
var backColors = new Array(width*height);
var moveArr = new Array();

function createTd(index) 
{
	celltds[index] = document.createElement('td');
	celltds[index].id = "c" + index;
	celltds[index].style.fontSize = "30pt";
	celltds[index].style.height = "2em";
	celltds[index].style.width = "2em";
	celltds[index].style.border = "3px solid black";
	celltds[index].style.textAlign = "center";
	celltds[index].onmouseover = mouseOver;
	celltds[index].onmouseout = mouseOut;
	celltds[index].onmousedown = mouseClick;
	celltds[index].onselectstart = function()
	{
		return false
	};
	celltds[index].onmouseup = function()
	{
		return false
	};
	celltds[index].innerHTML = "&nbsp;";

	if (puzzle.charAt(index) == '#') 
	{
		celltds[index].style.backgroundColor = "#333";
		backColors[index] = "#333";
	} 
	else 
	{
		celltds[index].style.backgroundColor = "#EEE";
		backColors[index] = "#EEE";
	}
}

// create the table with all the cells
function initLightsOutGrid() 
{
	var mydiv = document.getElementById('contain');
	var tbl = document.createElement('table');
	var tbody = document.createElement('tbody');

	for (var i = 0; i < height; i++) 
	{
		var newtr = document.createElement('tr');
		for (var j = 0; j < width; j++) 
		{
			createTd(i*width+j);
			newtr.appendChild(celltds[i*width+j]);
		}
		tbody.appendChild(newtr);
	}
	tbl.appendChild(tbody);
	mydiv.appendChild(tbl);
}


function getEventId(e) 
{
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode;
	return parseInt(targ.id.substring(1));
}


function mouseOver(e) 
{
	var index = getEventId(e);
	curCell = index;
}


function mouseOut(e) 
{
	var index = getEventId(e);
	curCell = -1;
}

function toggleState(index) 
{
	var ch;
	if (index < 0) 
	{
		return false;
	}
	if (index >= width*height) 
	{
		return false;
	}
	if (curpuz.charAt(index) == ' ') 
	{
		backColors[index] = "#333";
		ch = '#';
	} 
	else 
	{
		backColors[index] = "#EEE";
		ch = ' ';
	}
	celltds[index].style.backgroundColor = backColors[index];
	curpuz = curpuz.substr(0, index) + ch + curpuz.substr(index+1);

	return curpuz.indexOf(' ') == -1;
}


function mouseClick(e)
{
	var index = getEventId(e);
	if (curCell != index) 
	{
		return true;
	}
	if (index == prevClick) 
	{
		prevClick = -1;
	} 
	else 
	{
		prevClick = index;
	}
	
	if (index >= width) 
	{
		toggleState(index-width);
	}
	if (index%width >= 1) 
	{
		toggleState(index-1);
	}
	if (index%width <= width-2) 
	{
		toggleState(index+1);
	}
	if (index+width < height*width) 
	{
		toggleState(index+width);
	}
	if (toggleState(index)) 
	{
		alert("Congratulations! You have won!");
	}
	return false;
}
