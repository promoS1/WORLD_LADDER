"use strict";



var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {


	var marqueurs;
	var page;
	var contenu_fichier;
	var liste_membres;
	var compte;
	var adversaire;
	var contenu_fichier2;
	var partie;
	var joueur;
	var joueur2;
	var i;
	var grille;
	var colonne;
	var ligne_1;
	var ligne_2;
	var nb;
	var hote;

	


// LIT LE JSON "salon.json" 
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);


// MODIFIE LE JSON "salon.json" POUR METTRE LES DEUX JOUEURS EN ÉTAT : "joue"
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			hote = compte;
			adversaire = liste_membres[i].adversaire;
			liste_membres[i].hote = hote;
			liste_membres[i].etat = "joue";
			for (i = 0; i < liste_membres.length; i++) {
				if (liste_membres[i].compte === adversaire) {
					liste_membres[i].etat = "joue";
					liste_membres[i].hote = hote;
				}
			}
		}
	}


// ECRIT LE NOUVEAU JSON "salon.json" AVEC LES NOUVEAUX ÉTATS DES JOUEURS
	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");





	grille = '<table width = "90%" id="table1">';
	
	nb = Number(101);
	
	for (colonne = 0; colonne < 5; colonne++) {
		grille += "<tr>";	

		for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
			nb = nb - 1;
			grille += "<td>";	grille += nb;	grille += "</td>";
		}

		grille += "</tr>\n";	grille += "<tr>";	
		nb = nb - 11;

		for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
			nb = nb + 1;
			grille += "<td>";	grille += nb;	grille += "</td>";
		}

		grille += "</tr>\n";
		nb = nb - 9	;
	}	

	grille += '</table>';
	// INSCRIRE ICI LES CONDITIONS DE JEU

/*			if ( INSCRICRE CONDITIONS ) {
			} else if ( INSCRIRE CONDITIONS ) {
				grille += "</td>\n";
			} */


// CREATION DU JSON DE LA PARTIE "{Joueur Passif}.json"
	partie = [];
	joueur= {};
	joueur.compte = compte;
	joueur.player = "J1";
	joueur.tour = "actif";
	joueur.lancer = Number (0);
	joueur.position = Number (1);
	joueur.adversaire = adversaire;	
	joueur.grille = grille;

	joueur2 = {};
	joueur2.compte = adversaire;
	joueur2.player = "J2";
	joueur2.tour = "passif";
	joueur2.lancer = Number (0);
	joueur2.position = Number (1);
	joueur2.adversaire = compte;
	joueur2.grille = grille;

	partie[0] = joueur;
	partie[1] = joueur2;
	
	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier2, "utf-8");
	

	page = fs.readFileSync('./html/res_joueur_actif.html', 'utf-8');

	marqueurs = {};
	marqueurs.grille = grille;
	marqueurs.hote = hote;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};
//--------------------------------------------------------------------------

module.exports = trait;

