var debug = true;
var cards = {}; //map of id : Card
var ALL_CARDS = []
var idCounter = 0;

//FIXME this is janky
var cardText = `

Path - Beginner

Endure (0/1)
Type: Vigor
Dodge. Heal 1 HP.

Vigilance (0/1)
Type: Mental
Choose a target: reveal their intended actions. Play 1.	 

Sprint (0/1)
Type: Vigor, Move
Dodge. Move up to [AGI] + [STA]. Flush.


Defensive Strike (0/1)
Type: Melee
Dodge. [DEX] + 2 dmg.

Last Breath (0/1)
Type: Vigor
Dodge. Deal dmg equal to twice the number of cards in your Flush pile. Flush.

Running Fist (0/1)
Type: Melee, Move
Move up to 4, then:
[STR] + 2 dmg.

Rolling Shot (0/1)
Type: Ranged, Move
Dodge. Move 1. [DEX] dmg.

Coordinate (0/1)
Type: Social
Choose a target. They take +2 dmg from all attacks this turn.

Rally (0/1)
Type: Social
Recurring. You and adjacent allies deal +1 damage until the end of the turn.

Calculated Advantage (1/1)
Type: Melee
([INT]x3) - ([Round]x2) dmg.

Straight Shot (1/1)
Type: Ranged
Deal dmg equal to [PER] + [Round] + distance from target (max. 6)

Charge (1/1)
Type: Melee, Move
Move up to 6. Deal damage equal to the number of squares you moved this turn (“move anywhere” abilities count as 0).

Flash of Insight (1/1)
Type: Ranged
Dodge. [INT] + ([Round]x2) dmg.

Fighting Spirit (1/1)
Type: Vigor
Dodge. Heal 4 HP. Melee [SPI] dmg.

Rapid Fire (1/1)
Type: Ranged
Deal [PER] dmg, three times.

Pummel (1/1)
Type: Melee
Deal [DEX] dmg a number of times equal to the number of times this target was hit this Round.

Spinning Attack (1/1)
Type: Melee
Radius 1. [STR] + [Round] dmg.

Vengeful Spirit (1/1)
Type: Magic
Deal dmg equal to [SPI] + [Round] + the amount of HP you have currently lost (from your maximum amount).

Charged Shot  (1/1)
Type: Magic
Recurring. Add one counter to this card. Treat this card as an unplayable Basic. You may discard this card at any time to deal [DEX] x [number of counters] damage.

Barrel Blast (2/2)
Type: Alch
Radius 3. [WIS] + [Round] dmg.

Army of One (2/2)
Type: Melee
Radius 1. Deal [STA] + ([Round]x2) dmg twice.

All In (2/1)
Type: Vigor
Draw 2, Play 2. Next turn, do not draw a new hand.
`;

/**
 * Randomly shuffle an array
 * from https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function generateId(){
	idCounter += 1;
	return idCounter;
}

function updatePiles(){
	deck = document.getElementById("deckButton"); 
    deck.innerHTML = `Deck (${deckPile.length})`;
	
	flush = document.getElementById("flushButton"); 
    flush.innerHTML = `Flush (${flushPile.length})`;
	
	discard = document.getElementById("discardButton");
	discard.innerHTML = `Discard (${discardPile.length})`;
}

function characterClick(){ /*Load character page*/
document.getElementById("characterButton").style.display = "none";
document.getElementById("battleButton").style.display = "block";
document.getElementById("deckButton").style.display = "none";
document.getElementById("discardButton").style.display = "none";
document.getElementById("flushButton").style.display = "none";
toggle_visibility_by_class("stat_button", "block");
document.getElementById("hpreset").style.display = "none";
toggle_visibility_by_class("attr", "block");
toggle_visibility_by_class("held", "none");
toggle_visibility_by_class("hp", "none");
}


function battleClick(){  /*Load battle page*/
document.getElementById("battleButton").style.display = "none";
document.getElementById("characterButton").style.display = "block";
document.getElementById("deckButton").style.display = "block";
document.getElementById("discardButton").style.display = "block";
document.getElementById("flushButton").style.display = "block";
document.getElementById("hpreset").style.display = "block";
toggle_visibility_by_class("stat_button", "none");
toggle_visibility_by_class("attr", "none");
toggle_visibility_by_class("held", "inline-block");
toggle_visibility_by_class("hp", "inline-block");
character.currentDeck = character.deck; /* Reset deck, will eventually want to change this logic */
}


function toggle_visibility_by_class(cl, state){ /* state is usually none or block */
 var divs = document.getElementsByClassName(cl);
    for(var i = 0; i < divs.length; i++){
        divs[i].style.display = state;
    }
}

// //WIP
// function cardShop(card){
	// //TODO this needs some work, it messes a few things up
	// var button = document.createElement("button");
	// button.classList.add("button");
	// button.classList.add("card_button");
	// button.onclick = addCardToDeck;
	// //button.oncontextmenu = removeCardFromDeck;
	// button.id = generateId();
	// cards[id] = card;
	// /* FIXME security issue with setting the HTML directly from the cards.
	// Need to sanitize inputs here. */
	// //TODO remove debug border once the formatting looks good
	// cardText = `<div style="display:block;vertical-align:top;text-align:left;
				// font-weight:bold;font-size:12px;border-style:solid">
	// <b>${card.name} (${card.cost}/${card.power})</b>
	// <br>
	// ${card.types}
	// <br><br>
	// ${card.effect}
	// </div>`;
	// button.innerHTML = cardText;
	// button.style.display = "block";
	// shop = document.getElementById("shop");
	// shop.appendChild(button);
// }

function addCardToDeck(clickEvent){
	cardButton = clickEvent.currentTarget;
	id = cardButton.id;
	deckPile.push(id);
	updatePiles();
}

function drawCard(id){
		var button = document.createElement("button");
		button.classList.add("button");
		button.classList.add("card_button");
		button.onclick = discardCard;
		button.id = id;
		card = cards[id];
		/* FIXME security issue with setting the HTML directly from the cards.
		Need to sanitize inputs here. */
		//TODO remove debug border once the formatting looks good
		cardText = `<div style="display:block;vertical-align:top;text-align:left;
					font-weight:bold;font-size:12px;border-style:solid">
		<b>${card.name} (${card.cost}/${card.power})</b>
		<br>
		${card.types}
		<br><br>
		${card.effect}
		</div>`;
		button.innerHTML = cardText;
		button.style.display = "block";
		hand = document.getElementById("hand");
		hand.appendChild(button);
}

function discardCard(clickEvent){
	cardButton = clickEvent.currentTarget;
	id = cardButton.id;
	hand.removeChild(cardButton);
	discardPile.push(id);
	updatePiles();
}

function healthUp(d){
	die = d - 1;
	if (health[die] > 0 && health[die] < 6) {
		health[die] += 1;
	}
	
	updateHealth();
	return false; //don't show context menu
}

function healthDown(d){
	die = d - 1;
	if (health[die] > 0) {
		health[die] -= 1;
	}
	updateHealth();
	return false; //don't show context menu
}

function healthReset(){
	health = [6,6,6];
	updateHealth();
}

function updateHealth() {
	for (i=1; i<4; i++){
		id = "hp" + i.toString();
		button = document.getElementById(id);
		button.innerHTML = health[i-1];
		if (health[i-1] < 1){
			button.style.backgroundColor = "black";
			button.style.color = "black";
		}
		else {
			button.style.backgroundColor = "red";
			button.style.color = "white";
		}
	}
}


function deckClick(){
	if (deckPile.length > 0) {
		id = deckPile.pop();
		drawCard(id);
	}
	updatePiles();
}

function discardClick(){
	/* TODO */
	//for now, just move discard to Deck
	while (discardPile.length > 0) {
		deckPile.push(discardPile.pop())
	}
	shuffle(deckPile);
	updatePiles();
}

function flushClick(){
	/* TODO */
	//for now, just move discard to Deck
	while (discardPile.length > 0) {
		deckPile.push(discardPile.pop())
	}
	shuffle(deckPile);
	updatePiles();
}

function statMod(param, delta){
  /* TODO */
	character.stats[param] += delta; 
	eleName = param + "Stat"
	document.getElementById(eleName).innerHTML = param.toUpperCase() + ": " + character.stats[param]
}

function loadCards(){
	lines = cardText.split('\n');
	var path = "";
	var name = "";
	var cost = -1;
	var power = -1;
	var cp_regex = /(\d+)\/(\d+)\)/;
	var types = [];
	var effect = "";
	for (var i=0; i < lines.length; i++){
		if (lines[i].startsWith("Path - ")) {
			path = lines[i].substring(7);
		}
		else if (lines[i].length > 0) {
			if (name == "") {
				var splithead = lines[i].split(" (");
				if (splithead.length < 2) {
						console.log("Bad card: " + lines[i]);
						continue;
				}
				name = splithead[0];
				var match = splithead[1].match(cp_regex);
				cost = match[1];
				power = match[2];
				if (cost == "undefined" || power == "undefined"){
					console.log("Bad card: " + lines[i]);
					continue;
				}
			}
			else if (types == "") {
				types = lines[i].substring(6).split(", ");
			}
			else {
				effect += lines[i];
			}
		}
		else { // end of card
			if (name != "") {
				card = new Card(name, path, types, cost, power, effect);
				ALL_CARDS.push(card);
			}
			name = "";
			types = [];
			effect = "";
		}
	}
	
	//WIP
	// for (card in ALL_CARDS) {
		// cardShop(ALL_CARDS[card]);
	// }
}

class Path {
	constructor(name, requirements) {
		this.name = name;
		this.requirements = requirements;
	}
}

class Card {
	constructor(name, path, types, cost, power, effect) {
		this.name = name;
		this.path = path;
		this.types = types;
		this.cost = cost;
		this.power = power;
		this.effect = effect;
	}
}
	
class Character{
	/* Eventually, will also contain Decks, or sets of Cards */
	constructor(name){
		this.name = name;
		this.stats = {};
		this.stats["agi"] = 0;
		this.stats["dex"] = 0;
		this.stats["for"] = 0;
		this.stats["int"] = 0;
		this.stats["per"] = 0;
		this.stats["spi"] = 0;
		this.stats["sta"] = 0;
		this.stats["str"] = 0;
		this.stats["wis"] = 0;
		this.deck = []
		this.currentDeck = []
		this.discard = []
		this.flush = []
	}
}

/* INIT */
 /* Init Deck, Discard, Flush */
var health = [6,6,6];
var deckPile = []; //stores as ids, see the cards map
var discardPile = [];  //stores as ids, see the cards map
var flushPile = [];  //stores as ids, see the cards map
var character = new Character("New Character", 0,0,0,0,0,0,0,0,0);
/* populate testing deck */
character.deck.push(new Card("Test Card A", "Beginner", ["Basic", "Melee"], 0, 1, "This card does A, and it's very long and the text goes on forever and I'm just trying to see how long the text can go."));
character.deck.push(new Card("Test Card B", "Red", ["Vigor", "Ranged"], 1, 1, "This card does B"));
character.deck.push(new Card("Test Card C", "Blue", ["Mental"], 1, 2, "This card does C"));
character.currentDeck = character.deck;
/* Go to the Battle page on startup */
for (card in character.deck) {
	id = generateId();
	cards[id] = character.currentDeck[card];
	deckPile.push(id);
}
shuffle(deckPile);
battleClick();
loadCards();
updatePiles();