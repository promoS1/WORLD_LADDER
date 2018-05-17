"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var liste_membres;
	var i;
	var compte;
	var adversaire;
	var x;

// LIT LE JSON "salon.json" 
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);


// MODIFIE LE JSON "salon.json" POUR METTRE LES DEUX JOUEURS EN ÉTAT : "joue"
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			adversaire = liste_membres[i].adversaire;
			liste_membres[i].etat = "joue";
			for (i = 0; i < liste_membres.length; i++) {
				if (liste_membres[i].compte === adversaire) {
					liste_membres[i].etat = "joue";
				}
			}
		}
	}

// ECRIT LE NOUVEAU JSON "salon.json" AVEC LES NOUVEAUX ÉTATS DES JOUEURS
	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");

	page = fs.readFileSync('./html/res_joueur_actif.html', 'utf-8');

	marqueurs = {};
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

