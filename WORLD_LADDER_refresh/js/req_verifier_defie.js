"use strict";

var fs = require("fs");
require('remedial');


var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var compte;
	var adversaire_trouve;
	var adversaire;
	var liste;
	var i;
	var res_json;


	// LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);

	adversaire_trouve = false

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte == query.compte) {
			compte = liste_membres[i].compte;
			if (liste_membres[i].etat == "attente") {
				adversaire_trouve = true;
				adversaire = liste_membres[i].adversaire;
			}
		}
	}

	liste = "";
    for (i = 0; i < liste_membres.length; i++) {
        if (liste_membres[i].compte !== query.compte && liste_membres[i].etat === "connecté" && liste_membres[i].libre === "oui") {
            liste += "<form action = 'req_defie' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input class='bouton' type='submit' name='adversaire' value='"+ liste_membres[i].compte +"'></form><br>";
        }
    }

	res_json = JSON.stringify({
		"adversaire_trouve": adversaire_trouve,
		"html": liste
	});

	res.writeHead(200, {'Content-type': 'application/json'});
	res.write(res_json);
	res.end();

};
//==================================================

module.exports = trait;

