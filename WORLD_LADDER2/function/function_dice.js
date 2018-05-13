"use strict"

var fs = require("fs");

var function_dice = function() {

	var jet_random;
	var dice;
	var contenu_fichier;

//=======================LECTURE DE "dice.json" =============================//

	contenu_fichier = fs.readFileSync("./json/dice.json", "UTF-8");
	dice = JSON.parse(contenu_fichier);


//NOMBRE ALEATOIRE EN 1 ET 6
	
	jet_random = Math.floor(Math.random() * 6) + 1;
	
//=====================ECRITURE DANS "dice.json"==============================//

	dice = {}
	dice.nombre = jet_random
	contenu_fichier = JSON.stringify(dice);
	fs.writeFileSync("./json/dice.json", contenu_fichier, "UTF-8");

}

module.exports = function_dice
