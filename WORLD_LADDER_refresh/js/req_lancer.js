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
	var partie;
	var i;
	var a;
	var b;
	var position_J1;
	var position_J2;
	var hote;
	var jet_random;
	var grille;
	var img_dice;
	var colonne;
	var ligne_1;
	var ligne_2;
	var nb;
	
// LECTURE DU JSON "salon.json"
	contenu_fichier = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier);
	
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			adversaire = liste_membres[i].adversaire;
			hote = liste_membres[i].hote;
			compte = liste_membres[i].compte;
		}
	}


//NOMBRE ALEATOIRE EN 1 ET 6
	jet_random = Math.floor(Math.random() * 6) + 1;
	jet_random = Number (jet_random);




// LECTURE DU JSON DE LA PARTIE EN COURS "{hote}.json"
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier2);

// ECRITURE LA VALEUR DU JET DANS JSON "{hote}.json"	
	for (i = 0; i < partie.length; i++) {
		if (partie[i].compte === compte) {
			a = i;
			partie[a].victoire = "non";
			partie[a].lancer = jet_random;
			partie[a].position_temporaire = partie[a].position;
			partie[a].position += jet_random;
			if (partie[a].position >= 100) {
				partie[a].position = 100;
				partie[a].victoire = "gagner";
			}
			grille = partie[a].grille;
		} else {
			b = i;
			partie[b].victoire = "personne";
		}
	}

// ECRITURE: AJOUT DE "jet_random" DANS LE JSON "{hote}.json" 	
	contenu_fichier2 = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier2, "UTF-8");





//------------------------------------------------------------------------



//RELECTURE DU JSON POUR LE PLATEAU DE JEU
	contenu_fichier2 = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier2);

// CREATION DU PLATEAU DE JEU 
	grille = '<table id="table1">';
	
	nb = Number(101);
	
	for (colonne = 0; colonne < 5; colonne++) {
		grille += "<tr>";	

// LIGNE HORIZONTALES : 100; 80; 60; 40; 20; 
		for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
			nb = nb - 1;
			grille += "<td>";	
						if (nb === partie[a].position && partie[a].position === partie[b].position) {
							grille += "<img src = './html/pion_double.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte === hote) {
							grille += "<img src = './html/pion_bleu.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte !== hote) {
							grille += "<img src = './html/pion_rouge.png' class='pion'>";
						}

						if (nb === partie[b].position && partie[b].position === partie[a].position) {
							grille += "";
						} else if (nb === partie[b].position && partie[a].compte === hote) {
							if (partie[a].position_temporaire <= partie[b].position && partie[b].position <= partie[a].position) {
								grille += "";
							} else if ( partie[b].position > partie[a].position || partie[b].position < partie[a].position) {
								grille += "<img src = './html/pion_rouge.png' class='pion'> ";
							}
						
						} else if (nb === partie[b].position && partie[a].compte !== hote) {
							if (partie[a].position_temporaire <= partie[b].position && partie[b].position <= partie[a].position ) {
								grille += "";
							}else if ( partie[b].position > partie[a].position || partie[b].position < partie[a].position) {
								grille += "<img src = './html/pion_bleu.png' class='pion'> ";
							}
						}	


// MET LES EMPREINTES DE PAS DERRIÈRES LES PIONS LORSQU'ILS AVANCENT
			if (nb >= partie[a].position_temporaire && nb < partie[a].position && partie[a].compte === hote) {

				if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90){
					if (nb===partie[b].position) {
						grille += "<img src = './html/pion_rouge_pasB_haut.png' class='pion'>";
					}else if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
						grille += "<img src = './html/petit_pas_haut_bleu.png' class='pion'>";
					}
				} else if (nb===partie[b].position) {
					grille += "<img src = './html/pion_rouge_pasB_gauche.png' class='pion'>";
				} else {
					grille += "<img src = './html/petit_pas_gauche_bleu.png' class='pion'>";
				}
			}
			if (nb >= partie[a].position_temporaire && nb < partie[a].position && partie[a].compte !== hote) {

				if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) { 
					if (nb===partie[b].position) {
						grille += "<img src = './html/pion_bleu_pasR_haut.png' class='pion'>";
					} else if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
						grille += "<img src = './html/petit_pas_haut_rouge.png'class='pion' >";
					}
				} else if (nb===partie[b].position) {
					grille += "<img src = './html/pion_bleu_pasR_gauche.png' class='pion'>";
				} else {
					grille += "<img src = './html/petit_pas_gauche_rouge.png' class='pion'>";
				}
			}
			grille += "</td>";
		}
		grille += "</tr>\n";	grille += "<tr>";	
		nb = nb - 11;
		
// LIGNE HORIZONTALES : 81; 61; 41; 21; 1;
					for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
						nb = nb + 1;
						grille += "<td>";
//CHOISSIS LA BONNE COULEUR EN FONCTION DE SI LE JOUEUR EST L'HOTE DE LA PARTIE OU NON	
						if (nb === partie[a].position && partie[a].position === partie[b].position) {
							grille += "<img src = './html/pion_double.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte === hote) {
							grille += "<img src = './html/pion_bleu.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte !== hote) {
							grille += "<img src = './html/pion_rouge.png' class='pion'>";
						}

						if (nb === partie[b].position && partie[b].position === partie[a].position) {
							grille += "";
						} else if (nb === partie[b].position && partie[a].compte === hote) {
							if (partie[a].position_temporaire <= partie[b].position && partie[b].position <= partie[a].position) {
								grille += "";
							} else if ( partie[b].position > partie[a].position || partie[b].position < partie[a].position) {
								grille += "<img src = './html/pion_rouge.png' class='pion'> ";
							}
						
						} else if (nb === partie[b].position && partie[a].compte !== hote) {
							if (partie[a].position_temporaire <= partie[b].position && partie[b].position <= partie[a].position ) {
								grille += "";
							}else if ( partie[b].position > partie[a].position || partie[b].position < partie[a].position) {
								grille += "<img src = './html/pion_bleu.png' class='pion'> ";
							}
						}	

// MET LES EMPREINTES DE PAS DERRIÈRES LES PIONS LORSQU'ILS AVANCENT
			if (nb >= partie[a].position_temporaire && nb < partie[a].position && partie[a].compte === hote) {

				if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90){
					if (nb===partie[b].position) {
						grille += "<img src = './html/pion_rouge_pasB_haut.png' class='pion'>";
					}else if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
						grille += "<img src = './html/petit_pas_haut_bleu.png' class='pion'>";
					}
				} else if (nb===partie[b].position) {
					grille += "<img src = './html/pion_rouge_pasB_droite.png' class='pion'>";
				} else {
					grille += "<img src = './html/petit_pas_droite_bleu.png' class='pion'>";
				}
			}
			if (nb >= partie[a].position_temporaire && nb < partie[a].position && partie[a].compte !== hote) {

				if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) { 
					if (nb===partie[b].position) {
						grille += "<img src = './html/pion_bleu_pasR_haut.png' class='pion'>";
					} else if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
						grille += "<img src = './html/petit_pas_haut_rouge.png'class='pion' >";
					}
				} else if (nb===partie[b].position) {
					grille += "<img src = './html/pion_bleu_pasR_droite.png' class='pion'>";
				} else {
					grille += "<img src = './html/petit_pas_droite_rouge.png' class='pion'>";
				}
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



//-----------------------------------------------------------------


// AFFICHAGE DE LA BONNE IMAGE DU DÉS : 
	if (jet_random === 1) {
		img_dice = "<img class='dice' src= './html/dice_1.png'> <p class='phrase_dice_1'> Vous avez fait : 1 <br> Arf ! <br> Pas de chance. </p>";
	} else if (jet_random === 2) {
		img_dice = "<img class='dice' src= './html/dice_2.png'> <p class='phrase_dice_23'> Vous avez fait : 2 <br> Bof ! <br> Ce n'est pas terrible. </p>";
	} else if (jet_random === 3) {
		img_dice = "<img class='dice' src= './html/dice_3.png'> <p class='phrase_dice_23'> Vous avez fait : 3 <br> Bof ! <br> Ce n'est pas terrible. </p>";
	} else if (jet_random === 4) {
		img_dice = "<img class='dice' src= './html/dice_4.png'> <p class='phrase_dice_4'> Vous avez fait : 4 <br> Pas mal ! <br> Un joli lancé. </p>";
	} else if (jet_random === 5) {
		img_dice = "<img class='dice' src= './html/dice_5.png'> <p class='phrase_dice_5'> Vous avez fait : 5 <br> Pas mal ! <br> Un joli lancé. </p>";
	} else if (jet_random === 6) {
		img_dice = "<img class='dice' src= './html/dice_6.png'> <p class='phrase_dice_6'> Vous avez fait : 6 <br> Wouah ! <br> C'est un lancé parfait ! </p>";
	} else {
		img_dice = "";
	};



	page = fs.readFileSync('./html/res_de_tourne.html', 'utf-8');

	marqueurs = {};
	marqueurs.dice = img_dice;
	marqueurs.grille = grille;
	marqueurs.hote = hote;
	marqueurs.compte = compte;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

