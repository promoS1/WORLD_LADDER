"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');


var trait = function(req, res, query) {

	var contenu_fichier;
	var liste_membres;
	var i;
	var test = false;
	var page;
	var marqueurs = {};

//LISTE DE MEMBRES CONNECTÉ AU SALON

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8")
	liste_membres = JSON.parse(contenu_fichier);

	for (i = 0; i < membre_listes.length; i++) {
		if (liste_membre[i].compte == query.compte) {
			marqueurs.mdp = liste_membres[i].mdp
			if (liste_membre[i].etat !== "connecté") {
				test = true;
			}	
		}
	}



	if (test == false) {
		page = fs.readFileSync('./html/res_salon.html','utf-8');
	} else if (test == true) {
		page = fs.readFileSync("./html/res_joueur_actif.html", "utf-8");
	}



	
	marqueurs.pseudo = query.compte;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;
