"use strict"

var fs = require("fs");
var url = require ("url");
require = ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var liste_membres;
	var i;
	var page;
    var marqueurs = {};
	// LIRE LE JSON POUR VÉRIFIÉ LES JOUEURS PRÉSENT DANS LE SALON

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);

	
	// MODIFICATION DU JSON "SALON.JSON"
	
	for ( i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte == query.compte) {
			liste_membres[i].etat = "attente";	
			 marqueurs.mdp = liste_membres[i].mdp
		} else if ( liste_membres[i].compte == query.adversaire ) {
			liste_membres[i].etat = "attente";			
		}
	}
	

	// ECRITURE DU NOUVEAU JSON "SALON.JSON"

	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");

	page = fs.readFileSync("./html/res_attendre_reponse.html", "utf-8");

	
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
