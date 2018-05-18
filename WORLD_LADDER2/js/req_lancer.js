"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var compte;
	var adversaire;	
	var contenu_fichier;
	var liste_membres;
	var contenu_fichier2;
	var partie
	var i;
	var position_J1;
	var position_J2;
	var hote;
	
// LECTURE DU JSON "salon.json"
	contenu_fichier = fs.readFileSync("./json/salon.html", "utf-8");
	liste_membres = json.parse(contenu_fichier);
	
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			adversaire = liste_membres[i].adversaire;
			hote = liste_membres[i].hote;

			compte = liste_membres[i].compte;
		}
	}


// LECTURE DU JSON DE LA PARTIE EN COURS "{adversaire}.json"
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = json.parse(contenu_fichier2);
	
	for (i = 0; i < partie.length; i++) {
		if (partie[i].compte === compte) {
					

		}
	}
	


	// AFFICHAGE DE déé qui tourne 

	page = fs.readFileSync('./html/res_dee_tourne.html', 'utf-8');



	marqueurs = {};
	marqueurs.hote = hote;
	marqueurs.compte = query.compte;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

