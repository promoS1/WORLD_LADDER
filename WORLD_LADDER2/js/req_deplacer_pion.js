"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var compte;
	var hote;
	var contenu_fichier;
	var liste_membres;
	var contenu_fichier2;
	var partie;
	var i;
	var a;
	var jet_random;
	var grille;
	var nb;
	var ligne_1;
	var ligne_2;
	var colonne;
	var img_dice;
	var page;
	var marqueurs;


// LECTURE DU JSON "salon.json"
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);
	
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			hote = liste_membres[i].hote;
			compte = liste_membres[i].compte;
		}
	}


// LECTURE DU JSON DE LA PARTIE EN COURS "{hote}.json"
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier2);

// LECTURE DU "jet_random" DANS LE JSON "{hote}.json"
	for (i = 0; i < partie.length; i++) {
		if (partie[i].compte === compte) {
			jet_random = partie[i].lancer;
			grille = partie[i].grille;
		}
	}

// ECRITURE: AJOUT DE LA NOUVELLE POSITION DANS LE JSON "{hote}.json" 	
	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier2, "UTF-8");




//------------------------------------------------------------------------



//RELECTURE DU JSON POUR LE PLATEAU DE JEU
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier2);


// PREPARATION DES VARIABLES
// BOUCLE "IF" QUI VA FAIRE AVANCER LE PION DE 1 CASE ET REFRESH LA PAGE HTML
	nb = Number(101);


for (i = 0; i < partie.length; i++) {
	if (partie[i].compte === query.compte) {
		a = i;

		if (partie[i].position_temporaire !== partie[i].position) {
			
			partie[i].position_temporaire++;

// CREATION DU PLATEAU DE JEU 
			grille = '<table width = "90%" id="table1">';
	
			for (colonne = 0; colonne < 5; colonne++) {
				grille += "<tr>";	

// LIGNE HORIZONTALES : 100; 80; 60; 40; 20; 
				for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
					nb = nb - 1;
					grille += "<td>";		
					if(nb === partie[i].position_temporaire && partie[i].hote === query.compte) {
						grille += "<img src = './html/pion_bleu.png'> ";
					}
					if(nb === partie[i].position_temporaire && partie[i].hote !== query.compte) {
						grille += "<img src = './html/pion_rouge.png'> ";
					}
					grille += nb; 		grille += "</td>";
				}

				grille += "</tr>\n";	grille += "<tr>";	
				nb = nb - 11;

// LIGNE HORIZONTALES : 81; 61; 41; 21; 1;
				for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
					nb = nb + 1;
					grille += "<td>";	
					if(nb === partie[i].position_temporaire) {
						grille += "<img src = './html/pion_bleu.png'> ";
					}
					if(nb === partie[i].position_adversaire) {
						grille += "<img src = './html/pion_rouge.png'> ";
					}
					grille += nb;	grille += "</td>";
				}

				grille += "</tr>\n";
				nb = nb - 9	;
			}	
			
			grille += '</table>';
		
			partie[0].grille = grille;
			partie[1].grille = grille;
	
		}
	}
}
//SAUVEGARDE DE LA NOUVELLE GRILLE
	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier2, "utf-8");



//-----------------------------------------------------------------


// AFFICHAGE DE LA BONNE IMAGE DU DÉS : 
	if (jet_random === 1) {
		img_dice = "<img src= './html/dice_1.gif'>";
	} else if (jet_random === 2) {
		img_dice = "<img src= './html/dice_2.gif'>";
	} else if (jet_random === 3) {
		img_dice = "<img src= './html/dice_3.gif'>";
	} else if (jet_random === 4) {
		img_dice = "<img src= './html/dice_4.gif'>";
	} else if (jet_random === 5) {
		img_dice = "<img src= './html/dice_5.gif'>";
	} else if (jet_random === 6) {
		img_dice = "<img src= './html/dice_6.gif'>";
	}


// AFFICHAGE DE LA PAGE HTML EN FONCTION DE SI OUI OU NON LE PION A FINI D'AVANCER
		if (partie[a].position_temporaire !== partie[a].position) {
			page = fs.readFileSync('./html/res_deplacer_pion.html', 'utf-8');
		} else {
			page = fs.readFileSync('./html/res_page_conditions.html', 'utf-8');
		}



	marqueurs = {};
	marqueurs.dice = img_dice;
	marqueurs.grille = grille;
	marqueurs.hote = hote;
	marqueurs.compte = compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

