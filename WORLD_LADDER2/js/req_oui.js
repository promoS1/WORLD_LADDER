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




// CREATION DU JSON DE LA PARTIE "{Joueur Passif}.json"
	grille = "";
	partie = [];
	joueur= {};
	joueur.compte = compte;
	joueur.hote = hote;
	joueur.player = "J1";
	joueur.tour = "actif";
	joueur.lancer = Number (0);
	joueur.position = Number (1);
	joueur.position_adversaire = Number (1);
	joueur.adversaire = adversaire;	
	joueur.grille = grille;

	joueur2 = {};
	joueur2.compte = adversaire;
	joueur2.hote = hote;
	joueur2.player = "J2";
	joueur2.tour = "passif";
	joueur2.lancer = Number (0);
	joueur2.position = Number (1);
	joueur2.position_adversaire = Number (1);
	joueur2.adversaire = compte;
	joueur2.grille = grille;

	partie[0] = joueur;
	partie[1] = joueur2;
	
	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier2, "utf-8");

//RELECTURE DU JSON POUR LE PLATEAU DE JEU
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier2);

// CREATION DU PLATEAU DE JEU 
	grille = '<table  style="text-align:center" id="table1">';
	
	nb = Number(101);
	
	for (colonne = 0; colonne < 5; colonne++) {
		grille += "<tr>";	

// LIGNE HORIZONTALES : 100; 80; 60; 40; 20; 
		for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
			nb = nb - 1;
			grille += "<td>";
			if (nb === partie[0].position && partie[0].position === partie[1].position) {
				grille += "<img src = './html/pion_double.png' class='pion'>"
			}else if (nb === partie[0].position) {
				grille += "<img src = './html/pion_bleu.png' class='pion'> ";
			}else if (nb === partie[1].position) {
				grille += "<img src = './html/pion_rouge.png' class='pion'> ";
			}
		 	grille += "</td>";
		}

		grille += "</tr>\n";	grille += "<tr>";	
		nb = nb - 11;

// LIGNE HORIZONTALES : 81; 61; 41; 21; 1;
		for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
			nb = nb + 1;
			grille += "<td>";	
			if (nb === partie[0].position && partie[0].position === partie[1].position) {
				grille += "<img src = './html/pion_double.png' class='pion'>"
			}else if (nb === partie[0].position) {
				grille += "<img src = './html/pion_bleu.png' class='pion'> ";
			}else if (nb === partie[1].position) {
				grille += "<img src = './html/pion_rouge.png' class='pion'> ";
			}
			grille += "</td>";
		}

		grille += "</tr>\n";
		nb = nb - 9	;
	}	

	grille += '</table>';
	
	partie[0].grille = grille;
	partie[1].grille = grille;
	

//SAUVEGARDE DE LA NOUVELLE GRILLE
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

