"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var compte;
	var i;
	var adversaire_trouve = false;
	var marqueurs;
	var page;


	// LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte == query.compte) {
			compte = liste_membres[i].compte;
			if (liste_membres[i].etat == "attente") {
				adversaire_trouve = true;
			}
		}
	}

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	if (adversaire_trouve === false) {
		page = fs.readFileSync('./html/res_salon.html','utf-8');
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync("./html/res_reponse_defie.html", "utf-8");
	}



	marqueurs = {};
	marqueurs.compte = compte;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;

