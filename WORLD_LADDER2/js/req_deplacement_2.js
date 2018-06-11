"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var compte;
	var hote;
	var contenu_fichier;
	var partie;
	var i;
	var a;
	var b;
	var x;
	var ma_position_pour_adversaire;
	var jet_random;
	var grille;
	var nb;
	var ligne_1;
	var ligne_2;
	var colonne;
	var img_dice;
	var page;
	var marqueurs;
	var victoire;

	victoire = false;
	compte = query.compte;
	hote = query.hote;


// LECTURE DU JSON "{hote}.json"
	contenu_fichier = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier);


// IDENTIFICATION DE LA POSITION DU JOUEUR VIA LE JSON "{hote}.json"
	for (i = 0; i < partie.length; i++) {
		if (partie[i].compte === compte) {
			a = i;
		} else {
			b = i;
		}
	}
// PASSE LE JOUEUR EN TOUR PASSIF DANS LE JSON "{hote}.json"
			partie[a].tour = "passif";
			

// RETROUVE LA VALEUR DU LANCER DE DÉS POUR CONTINUER A AFFICHER L'IMAGE
			jet_random = partie[a].lancer;

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



// VERIFICATION DES CONDITIONS SUR LE PLATEAU DE JEU
// SI PION SUR CASE SPÉCIALE, MODIFICATION DE LA POSITION : ECHELLE
			if (partie[a].position === 3) {
				partie[a].position = 21;
			} else if (partie[a].position === 8) {
				partie[a].position = 30;
			} else if (partie[a].position === 28) {
				partie[a].position = 84;
			} else if (partie[a].position === 58) {
				partie[a].position = 77;
			} else if (partie[a].position === 75) {
				partie[a].position = 86;
			} else if (partie[a].position === 80) {
				partie[a].position = 100;
			} else if (partie[a].position === 90) {
				partie[a].position = 91;
			} else if (partie[a].position > 100) {
				partie[a].position = 100;
			}
		
// SI PION SUR CASE SPÉCIALE, MODIFICATION DE LA POSITION : SERPENT
			if (partie[a].position === 17) {
				partie[a].position = 3;
			} else if (partie[a].position === 52) {
				partie[a].position = 29;
			} else if (partie[a].position === 57) {
				partie[a].position = 40;
			} else if (partie[a].position === 62) {
				partie[a].position = 22;
			} else if (partie[a].position === 88) {
				partie[a].position = 18;
			} else if (partie[a].position === 95) {
				partie[a].position = 51;
			} else if (partie[a].position === 97) {
				partie[a].position = 79;
			}

//				--------------------------------
// VERIFIE SI LE JOUEUR À GAGNÉ OU PERDU
			if (partie[a].position === 100) {
				partie[a].tour = "gagner";
				partie[b].tour = "perdu";
				victoire = true;
			}



// ENVOIE DE MA POSITION À L'AUTRE JOUEUR
			partie[b].position_adversaire = partie[a].position;


// PASSE LE JOUEUR ADVERSE EN TOUR ACTIF DANS LE JSON "{hote}.json"
			partie[b].tour = "actif";



//-------------------------------------------------------------------------
	// CREATION DU PLATEAU DE JEU 
			grille = '<table id="table1">';
		
			nb = Number(101);
		
			for (colonne = 0; colonne < 5; colonne++) {
				grille += "<tr>";	

// LIGNE HORIZONTALES : 100; 80; 60; 40; 20; 
				for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
					nb = nb - 1;
					grille += "<td>";
					if (nb === partie[a].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png'> ";		
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'>";
					}

					if (nb === partie[a].position_adversaire && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png'> ";
					} else if (nb === partie[a].position_adversaire && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png'> ";
					} else if (nb === partie[a].position_adversaire && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					}						
					grille += "</td>";
				}

				grille += "</tr>\n";	grille += "<tr>";	
				nb = nb - 11;

// LIGNE HORIZONTALES : 81; 61; 41; 21; 1;
				for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
					nb = nb + 1;
					grille += "<td>";	
					if (nb === partie[a].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png'> ";
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'>";
					}

					if (nb === partie[b].position && partie[b].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png'> ";
					} else if (nb === partie[b].position && partie[b].compte === hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					} else if (nb === partie[b].position && partie[b].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'> ";
					}						
					grille += "</td>";
				}

				grille += "</tr>\n";
				nb = nb - 9	;
			}	
			grille += '</table>';

//----------------------------------------------------------------
				partie[a].position_temporaire = partie[a].position;
				partie[b].position_temporaire = partie[b].position;
						

// ECRITURE DU NOUVEAU JSON "SALON.JSON"

	contenu_fichier = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier, "utf-8");

	if (victoire === true) {
		page = fs.readFileSync('./html/res_gagner.html', 'utf-8');		
	} else {
		page = fs.readFileSync('./html/res_joueur_passif.html', 'utf-8');
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

