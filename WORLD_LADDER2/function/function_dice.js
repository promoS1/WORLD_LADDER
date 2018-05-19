/*"use strict";

var fs = require("fs");
require ("remedial");
var trait = function (req, res, query) {
var function_dice = function() {

	var jet_random;
	var dice;
	var contenu_fichier;
	var liste_membres;
	var i;
	var compte;
	var hote;
	var contenu_fichier2;
	var partie;

	compte = query.compte;

// LECTURE DU JSON "salon.json" pour trouver l'hote de la partie
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);

	for (i = 0; i < liste_membres.length; i++) {
		if (compte === liste_membres[i].compte) {
			hote = liste_membres.hote;
		}
	}

// LECTURE DU JSON "{hote}.json" 
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "UTF-8");
	partie = JSON.parse(contenu_fichier2);


//NOMBRE ALEATOIRE EN 1 ET 6
	
	jet_random = Math.floor(Math.random() * 6) + 1;

	
// ECRITURE LA VALEUR DU JET DANS JSON "{hote}.json"
	for (i = 0; i < partie.length; i++) {
		if (compte === partie[i].compte) {
			partie[i].lancer = jet_random;
		}
	}

	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_encours/" + hote + ".json", contenu_fichier, "UTF-8");
	
};
module.exports = function_dice;
};
module.exports = trait;

*/


