"use strict"

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var liste_membres;
	var adversaire;
	var i;
	var page;
	var liste;
	var marqueurs;

// LIRE LE JSON 

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);

// MODIFICATION DU JSON "SALON.JSON" REPASSER EN ETAT : "CONNECTÉ"
	
	for (i = 0; i < liste_membres.length; i++) {
		if ( liste_membres[i].compte === query.compte ) {
			adversaire = liste_membres[i].adversaire
			liste_membres[i].etat = "connecté";
			liste_membres[i].libre = "oui";
			liste_membres[i].adversaire = "non";
			for (i = 0; i < liste_membres.length; i++) {
				if ( liste_membres[i].compte === adversaire ) {
					liste_membres[i].etat = "connecté";
					liste_membres[i].adversaire = "non";
				}
			}		
		}		
	}


//REECRITURE DU JSON "SALON.JSON" --> REPASSE LES MEMBRES EN "CONNECTÉ"

	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");


	contenu_fichier = fs.readFileSync("./json/salon.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	liste = "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].etat === "connecté" && liste_membres[i].libre === "oui") {
			liste += "<form action = 'req_defie' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type = 'hidden' name ='adversaire' value='"+ liste_membres[i].compte +"'><button class='button1' name='action' value=''>" + liste_membres[i].compte + "</button></form>";
		}
	}


	page = fs.readFileSync("./html/res_salon.html", "utf-8");
	
	marqueurs = {};
	marqueurs.joueurs = liste;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

module.exports = trait;
