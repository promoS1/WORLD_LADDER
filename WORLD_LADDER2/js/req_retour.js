"use strict"

var fs = require("fs");
var url = require ("url");
require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var i;
	var page;
	var marqueurs;

	// LIRE LE JSON 
	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);

	// MODIFICATION DU JSON "SALON.JSON" REPASSER EN ETAT : "CONNECTÉ"
	
	for (i = 0; i < liste_membres.length; i++) {
		if ( liste_membres[i].compte === query.compte) {
			liste_membres[i].etat = "connecté";
		} else if ( liste_membres[i].compte === query.adversaire) {
			liste_membres[i].etat = "connecté"
		}
	}

	//REECRITURE DU JSON "SALON.JSON" --> REPASSE LES MEMBRES EN "CONNECTÉ"
	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");

	page = fs.readFileSync("./html/res_salon.html", "utf-8");

	marqueurs = {};
	marqueurs.compte = query.compte
	page =page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}
