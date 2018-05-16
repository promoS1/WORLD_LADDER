"use strict"

var fs = require("fs");
var url = require ("url");
require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var i;
	var adversaire_trouve = false;


	// LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membre[i].compte == query.compte) {
			if (liste_membre[i].etat == "attente") {
				adversaire_trouve = true;
			}
		}
	}




}
