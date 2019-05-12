function updatePiles(){
/* TODO:
     - whenever a button is clicked, call this function
	 - update Deck, Discard, and Flush piles to show the count of how many cards are in each pile
	 - Example: Deck (12), Discard (4), Flush (0) */
	 
	null;
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

function deckClick(){
/* TODO */
	if (character.currentDeck.length > 0) {
		card = character.currentDeck.pop();
		var button = document.createElement("button");
		button.classList.add("button");
		button.classList.add("card_button");
		button.onclick = "";
		button.innerHTML = card.name;
		button.style.display = "block";
		hand = document.getElementById("hand");
		hand.appendChild(button);
	}
}

function discardClick(){
/* TODO */
	null;
}

function flushClick(){
/* TODO */
	null;
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
character.deck.push(new Card("Test Card A", "Beginner", ["Basic", "Melee"], "This card does A"));
character.deck.push(new Card("Test Card B", "Red", ["Vigor", "Ranged"], "This card does B"));
character.deck.push(new Card("Test Card C", "Blue", ["Mental"], "This card does C"));
 /* Go to the Battle page on startup */
battleClick()