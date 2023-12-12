var req;
var currentCell = -1;
var previousClick = -1;
var tableDataCells = new Array(width*height);
var cellColors = new Array(width*height);

function createTd(index) 
{
	tableDataCells[index] = document.createElement('td');
	tableDataCells[index].id = "c" + index;
	tableDataCells[index].style.fontSize = "30pt";
	tableDataCells[index].style.height = "2em";
	tableDataCells[index].style.width = "2em";
	tableDataCells[index].style.border = "3px solid black";
	tableDataCells[index].style.textAlign = "center";
	tableDataCells[index].onmouseover = mouseOver;
	tableDataCells[index].onmouseout = mouseOut;
	tableDataCells[index].onmousedown = mouseClick;
	tableDataCells[index].onselectstart = function()
	{
		return false
	};
	tableDataCells[index].onmouseup = function()
	{
		return false
	};
	tableDataCells[index].innerHTML = "&nbsp;";
	if (puzzle.charAt(index) == '#') 
	{
		tableDataCells[index].style.backgroundColor = "#333";
		cellColors[index] = "#333";
	} 
	else 
	{
		tableDataCells[index].style.backgroundColor = "#EEE";
		cellColors[index] = "#EEE";
	}
}

function initGrid() 
{
	var div = document.getElementById('container');
	var table = document.createElement('table');
	var tableBody = document.createElement('tableBody');

	for (var i = 0; i < height; i++) 
	{
		var newTableRow = document.createElement('tr');
		for (var j = 0; j < width; j++) 
		{
			createTd(i*width+j);
			newTableRow.appendChild(tableDataCells[i*width+j]);
		}
		tableBody.appendChild(newTableRow);
	}
	table.appendChild(tableBody);
	div.appendChild(table);
}


function getEventId(e) 
{
	var target;
	if (!e) var e = window.event;
	if (e.target) target = e.target;
	else if (e.srcElement) target = e.srcElement;
	if (target.nodeType == 3) target = target.parentNode;
	return parseInt(target.id.substring(1));
}


function mouseOver(e) 
{
	var index = getEventId(e);
	currentCell = index;
}


function mouseOut(e) 
{
	var index = getEventId(e);
	currentCell = -1;
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
		cellColors[index] = "#333";
		ch = '#';
	} 
	else 
	{
		cellColors[index] = "#EEE";
		ch = ' ';
	}
	tableDataCells[index].style.backgroundColor = cellColors[index];
	curpuz = curpuz.substr(0, index) + ch + curpuz.substr(index+1);

	return curpuz.indexOf(' ') == -1;
}


function mouseClick(e)
{
	var index = getEventId(e);
	if (currentCell != index) 
	{
		return true;
	}
	if (index == previousClick) 
	{
		previousClick = -1;
	} 
	else 
	{
		previousClick = index;
	}
	
	if (index >= width) 
	{
		toggleState(index - width);
	}
	if (index % width >= 1) 
	{
		toggleState(index - 1);
	}
	if (index % width <= width - 2) 
	{
		toggleState(index+1);
	}
	if (index + width < height * width) 
	{
		toggleState(index + width);
	}
	if (toggleState(index)) 
	{
		alert("Congratulations! You have won!");
	}
	return false;
}
