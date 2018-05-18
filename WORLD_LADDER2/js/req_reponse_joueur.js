"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var adversaire;
	var i;
	var compte;
	var page;
	var marqueurs;
	var hote;


	// LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			hote = liste_membres[i].hote;
			adversaire = liste_membres[i].adversaire;
			if (liste_membres[i].etat === "connecté") {
				page = fs.readFileSync('./html/res_refus.html','utf-8');
			} else if (liste_membres[i].etat === "joue") {
				page = fs.readFileSync("./html/res_joueur_passif.html", "utf-8");
			} else {
				page = fs.readFileSync("./html/res_attendre_reponse.html", "utf-8");
			}
		}
	}


	marqueurs = {};
	marqueurs.joueur = query.joueur;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	marqueurs.hote = hote;

	page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

module.exports = trait;

