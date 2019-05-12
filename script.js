var debug = true;

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
toggle_visibility_by_class("attr", "block");
toggle_visibility_by_class("held", "none");
}


function battleClick(){  /*Load battle page*/
document.getElementById("battleButton").style.display = "none";
document.getElementById("characterButton").style.display = "block";
document.getElementById("deckButton").style.display = "block";
document.getElementById("discardButton").style.display = "block";
document.getElementById("flushButton").style.display = "block";
toggle_visibility_by_class("stat_button", "none");
toggle_visibility_by_class("attr", "none");
toggle_visibility_by_class("held", "inline-block");
character.currentDeck = character.deck; /* Reset deck, will eventually want to change this logic */
}


function toggle_visibility_by_class(cl, state){ /* state is usually none or block */
 var divs = document.getElementsByClassName(cl);
    for(var i = 0; i < divs.length; i++){
        divs[i].style.display = state;
    }
}

function drawCard(card){
		var button = document.createElement("button");
		button.classList.add("button");
		button.classList.add("card_button");
		button.onclick = "";
		/* FIXME security issue with setting the HTML directly from the cards.
		Need to sanitize inputs here. */
		//TODO remove debug border
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

function deckClick(){
/* TODO */
	if (character.currentDeck.length > 0) {
		card = character.currentDeck.pop();
		drawCard(card);
	}
	updatePiles();
}

function discardClick(){
/* TODO */
	null;
		
	updatePiles();
}

function flushClick(){
/* TODO */
	null;
	
	updatePiles();
}

function statMod(param, delta){
  /* TODO */
	character.stats[param] += delta; 
	eleName = param + "Stat"
	document.getElementById(eleName).innerHTML = param.toUpperCase() + ": " + character.stats[param]
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
var deckPile = [];
var discardPile = [];
var flushPile = [];
var character = new Character("New Character", 0,0,0,0,0,0,0,0,0);
/* populate testing deck */
character.deck.push(new Card("Test Card A", "Beginner", ["Basic", "Melee"], 0, 1, "This card does A"));
character.deck.push(new Card("Test Card B", "Red", ["Vigor", "Ranged"], 1, 1, "This card does B"));
character.deck.push(new Card("Test Card C", "Blue", ["Mental"], 1, 2, "This card does C"));
/* Go to the Battle page on startup */
deckPile = character.deck;
shuffle(deckPile);
battleClick();
updatePiles();