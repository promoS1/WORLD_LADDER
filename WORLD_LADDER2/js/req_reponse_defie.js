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
	var marqueurs = {};
	var page;


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

	// GENÈRE LISTE DE JOUEURS CONNECTÉ SUR LE SALON "salon.json"

	liste= "";
		for (i = 0; i < liste_membres.length; i++) {
			if (liste_membres[i].compte !== query.compte && liste_membres[i].etat === "connecté") {
				liste += "<form action = 'req_defie' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type = 'hidden' name ='adversaire' value='"+ liste_membres[i].compte +"'><button class='button1' name='action' value=''>" + liste_membres[i].compte + "</button></form>";
			}		
		}


	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	if (adversaire_trouve === false) {
		page = fs.readFileSync('./html/res_salon.html','utf-8');
		marqueurs.compte = query.compte;
		marqueurs.adversaire = adversaire;
		marqueurs.joueurs = liste;
		page = page.supplant(marqueurs);
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync("./html/res_reponse_defie.html", "utf-8");
	}




	marqueurs.compte = query.compte;
	marqueurs.adversaire = adversaire;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;

