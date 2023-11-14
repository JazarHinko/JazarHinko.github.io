var health = 10;
var attackPower = 3;

// common action buttons:
//const danceButton = document.querySelector('#dance');
//const investigateButton = document.querySelector('#investigate');
//const attackButton = document.querySelector('#attack');

// constant to alter happen text easier
const happenText = document.querySelector('.happen');

// location variable used to track where the player currently is.
let currentRoom;

// all the enemies/creatures you can encounter.
// template: (name) = [(name), (number), maxhealth, curhealth, attack]
/*
var pirate = ['Pirate', 1, 4, 4, 3];
var apex = ['Apex Predator', 1, 9, 9, 3];
*/

// all the possible losses
let lostLoss, deathLoss, seaLoss, beastLoss, trapLoss;

// all the possible wins
let escapeWin, pirateWin, apexWin, ritualWin, treasureWin;

// all the locations
let clearing, riverPath, lightJungle, denseJungle, docks, den, temple, sailboat, pirateShip, apexFight, altarRoom, treasureRoom;

// locations need to be defined in reverse order so that they can reference each other for navigation
// define all the losses

lostLoss = 
{
	name: 'Lost in the Jungle',
	description: 'You are lost in the Jungle, with no idea of which way to go',
	search: 'You are pretty sure you were here an hour ago...',
	talk: 'You speak but the only response is the insects...',
	rest: 'You sit and futilely try to figure out where to go...',
	image: 'skull.jpg'
}

deathLoss = 
{
	name: 'Dead',
	description: 'You have been slain attempting a strange ritual, why did you think that would work?...',
	search: 'You see a familiar body...',
	talk: 'You try to speak but no sounds come out...',
	rest: 'You try to rest but can not get any sleep for some reason...',
	image: 'skull.jpg'
}

seaLoss =
{
	name: 'Lost at Sea',
	description: 'You are lost at sea, with no idea of which way to go',
	search: 'You see water and more water...',
	talk: 'You speak but there is no response...',
	rest: 'You sleep, there is not much else to do anyways...',
	image: 'skull.jpg'
}

/*
beastLoss =
{
	name: 'Slain by Apex Predator',
	description: 'You have been slain by the apex predator, perhaps if you had found a better weapon...',
	search: 'You see a familiar body...',
	talk: 'You try to speak but no sounds come out...',
	rest: 'You try to rest but can not get any sleep for some reason...',
	image: 'skull.jpg'
}
*/

trapLoss = 
{
	name: 'Fallen Into a Pitfall',
	description: 'In your rush for treasure, you triggered a pitfall trap and fell in, perhaps if you had take the time to search things would have gone differently.',
	search: 'You see skeletons of others who also fell for the trap...',
	talk: 'You speak but there is no response...',
	rest: 'You sleep, there is not much else to do anyways...',
	image: 'skull.jpg'
}

// define all the wins
escapeWin =
{
	name: 'Civilization at Last',
	description: 'After days of sailing, you see a port off in the distance, in a few hours, you will be back with civilization.',
	search: 'There is nothing new on your boat...',
	talk: 'You cheer in excitement, drowned out by the waves.',
	rest: 'Now is no time to rest, you must pull into dock!',
	image: 'civilization.jpg'
}

pirateWin =
{
	name: 'YAR HAR',
	description: 'You have found yourself on a pirate ship and the pirates are seemingly more than willing to let a lost traveler join their crew, as long as you pull your weight.',
	search: 'The ship is filled with plundered goods and alcohol.',
	talk: 'You talk with some of your now crewmates, many of whom are quite interested in who you are and how you ended up in the jungle.',
	rest: 'You sleep on a nice bed.',
	image: 'pirate.jpg'
}

/*
apexWin =
{
	name: 'Apex Predator',
	description: '',
	search: '',
	talk: '',
	rest: '',
	image: ''
}
*/

ritualWin =
{
	name: 'Ascension',
	description: 'You have succesfully completed the ritual, you are not quite sure what it did, but it you feel better than you ever had before and no longer feel the need to eat, sleep, or drink.',
	search: 'You find a deal of trinkets around the temple that depict some greater being.',
	talk: 'You speak, in turn the world seems to speak to you, whispering about the ongoings in the jungle',
	rest: 'You are not tired',
	image: 'ascension.jpg'
}

treasureWin =
{
	name: 'TREASURE!',
	description: 'You enter the treasure room and no traps go off, there is more than enough gold to live the rest of your life comfortably, along with an outdated map and compass, which you should still be able to use to return to civilization.',
	search: 'There is soooo much gold that it is hard to find anything else.',
	talk: 'You cheer in excitement, echoing off the empty walls.',
	rest: 'You rest on top of the piles of gold.',
	image: 'treasure.jpg'
}

// define the locations in reverse order

pirateShip = 
{
	name: 'Pirate Ship',
	description: 'In front of you lies a pirate ship, on it you can see some pirates, though they do not seem to pay you any mind.',
	search: 'You find various empty bottles and trash in the surrounding area.',
	talk: 'You call out to one of the pirates, they do not respond, but they do look over and achknowldge you.',
	forward: pirateWin,
	image: 'pirateShip.jpg'
}

sailboat = 
{
	name: 'Sailboat',
	description: 'In front of you lies a small sailboat, clearly very old, but still in good condition.',
	search: 'In the sailboat lies some fresh supplies, seemingly placed in it recently.',
	talk: 'There is no one nearby to talk to.',
	rest: 'You rest in the sailboat.',
	forward: randomWinLoss(50, escapeWin, seaLoss),
	image: 'sailboat.jpg'
}

docks = 
{
	name: 'Docks',
	description: 'You find yourself on a dock, a bit further ahead you see a large ship of some kind, and to your right you see what appears to be a small sailboat.',
	search: 'You find an old shipping manifest.',
	forward: pirateShip,
	right: sailboat,
	image: 'dock.jpg'
}

riverPath =
{
	name: 'River Path',
	description: 'You find a fairly clear river, perhaps following it downstream will lead you to something.',
	search: 'You find a very cool stick.',
	rest: 'You take a bit of time to wash up in the river.',
	forward: docks,
	image: 'riverPath.jpg'
}

altarRoom = 
{
	name: 'Altar Room',
	description: 'You enter a large room, filled with hundreds of strange trinkets, sigils, and art pieces, it appears to be some sort of religious room.',
	search: 'You find an old ruby amulet with strange symbols on them.',
	talk: 'You say something and for a moment you think you heard something respond.',
	forward: randomWinLoss(70, ritualWin, deathLoss),
	image: 'altarRoom.jpg'
}

treasureRoom = 
{
	name: 'Treasure Room',
	description: 'Ahead of you lies a treasure room, you just have to cross this dark, narrow, ancient hallway...',
	search: 'You faintly make out a broken tripwire.',
	forward: randomWinLoss(50, treasureWin, trapLoss),
	image: 'treasureRoom.jpg'
}

temple = 
{
	name: 'Temple',
	description: 'You find an ancient temple, probably seemingly from an undiscovered ancient civilization.',
	search: 'You find an obsidian arrowhead, strange considering there are no known volcanos nearby.',
	rest: 'You rest in the dark and damp temple.',
	forward: altarRoom,
	left: treasureRoom,
	image: 'temple.jpg'
}

denseJungle = 
{
	name: 'Dense Jungle',
	description: 'This part of the jungle is very thick, indicating that no one has been hear in years, if ever.',
	search: 'You find a strange stone, looks like it used to have some sort of carving on it, too faded to see now though.',
	forward: temple,
	image: 'denseJungle.jpg'
}

/*
apexFight = 
{
    name: 'Apex Fight', 
    description: 'You entered the den', 
    enemies: apex, 
    battle: 'In the den is a beast far larger than any you have seen, what do you do?', 
    attack: 'You attack the predator!',
    search: 'You see a pile of what appears to be a variety of corpses.',
	talk: 'You attempt to talk to the beast, it does not understand you'
	rest: 'You take a short break'
    forward: apexWin,
    image: 'beast.png'
};

den = 
{
	name: 'Apex Den',
	description: '',
	enemies: ,
	battle: '',
	search: '',
	talk: '',
	rest: '',
	forward: apexFight,
	right: docks,
	left: temple,
	image: ''
}
// set directions for temple and docks to den now that den exists
docks.left = den;
temple.right = den;

lightJungle =
{
	name: 'Light Jungle',
	description: '',
	search: '',
	talk: '',
	rest: '',
	forward: den,
	right: riverPath,
	left: denseJungle,
	image: ''
}
*/

clearing = 
{
	name: 'Camp Clearing',
	description: 'You are in the remains of your campsite',
	search: 'You find a peice of packaged food that you had though blown off while setting up camp.',
	rest: 'You quickly set up a sleeping bag and take a nap.',
	//forward: lightJungle,
	right: riverPath,
	left: denseJungle,
	image: 'clearing.jpg'
}

// set all the backwards paths

pirateShip.backwards = docks;
sailboat.backwards = docks;
docks.backwards = randomWinLoss(15, riverPath, lostLoss);
riverPath.backwards = randomWinLoss(5, clearing, lostLoss);
altarRoom.backwards = temple;
treasureRoom.backwards = temple;
temple.backwards = randomWinLoss(15, denseJungle, lostLoss);
denseJungle.backwards = randomWinLoss(5, clearing, lostLoss);
/*
apexFight.backwards = den;
den.backwards = lightJungle;
lightJungle.backwards = clearing;
*/


// functions to reduce redundancy and complexity
	// function to randomize win/loss in the two events needed
function randomWinLoss(percent, win, loss)
{
	// generate a random number
	var rand = Math.floor(Math.random() * 100)
	
	if(rand >= percent)
	{
		return win;
	}
	else
	{	
		return loss;
	}
}

function newRoom() {

    let currentRoomName = document.querySelector('h1');
    currentRoomName.innerText = currentRoom['name'];
    let CurrentRoomDescription = document.querySelector('.description');
    CurrentRoomDescription.innerText = currentRoom.description;
    let RoomHappening = happenText;
    RoomHappening = "You entered a new room.";
    let roomImage = document.querySelector('img')
    roomImage.src = currentRoom.image;
}

// button listeners
document.querySelector('.options').addEventListener('click', function(e)
{
    console.log('You decide to ' + e.target.getAttribute('id') + '...');
    const buttonPressed = e.target;
    console.log(typeof buttonPressed.id);
    console.log(typeof(currentRoom[buttonPressed.id]));

	

    //if the action is not set in the current room
	if(buttonPressed == restart)
	{
		currentRoom = clearing;
		newRoom();
		happenText.innerText = 'The journey begins anew'
	}
	else if (currentRoom[buttonPressed.id] == undefined)
	{
        //give a general response of nothing happened
        happenText.innerText = 'nothing happened';
    } 
	else 
	{
        // if the action is set, use that room's attribute instead
        happenText.innerText = currentRoom[buttonPressed.id];
    }
})

// more button listeners
document.querySelector('.directions').addEventListener('click', function(e){
    const buttonPressed = e.target;
    console.log(buttonPressed.id)
   
	if (currentRoom[buttonPressed.id] != undefined) 
	{
		currentRoom = currentRoom[buttonPressed.id];
		happenText.innerText = 'You went ' + buttonPressed.id;
	} 
	else 
	{
		happenText.innerText = 'You end up in the same area somehow'
	} 
    newRoom();
})

//start the game in the clearing
currentRoom = clearing;
newRoom();