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
	var grille;
	var nb;
	var ligne_1;
	var ligne_2;
	var colonne;
	var img_dice;
	var page;
	var marqueurs;

	hote = query.hote;
	compte = query.compte;

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

// ON CREER UNE GRILLE SPÉCIFIQUE POUR LE JOUEUR ACTIF
		if (partie[a].tour === "passif") {
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
						grille += "<img src = './html/pion_double.png' class='pion'> ";	
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'class='pion' >";
					}

					if (nb === partie[b].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png' class='pion'> ";
					} else if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'> ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'> ";
					}
// MET LES EMPREINTES DE PAS DERRIÈRES LES PIONS LORSQU'ILS AVANCENT
					if (nb >= partie[b].position_temporaire && nb < partie[b].position && partie[b].compte === hote) {
						if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
							grille += "<img src = './html/petit_pas_haut_bleu.png' class='pion'>";
						} else {
							grille += "<img src = './html/petit_pas_gauche_bleu.png' class='pion'>";
						}
					}
					if (nb >= partie[b].position_temporaire && nb < partie[b].position && partie[b].compte !== hote) {
						if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
							grille += "<img src = './html/petit_pas_haut_rouge.png' class='pion'>";
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
						if (nb === partie[a].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
							grille += "<img src = './html/pion_double.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte === hote) {
							grille += "<img src = './html/pion_bleu.png' class='pion'> ";
						} else if (nb === partie[a].position && partie[a].compte !== hote) {
							grille += "<img src = './html/pion_rouge.png' class='pion'>";
						}

						if (nb === partie[b].position && partie[a].compte === hote && partie[b].position === partie[a].position ) {
							grille += "<img src = './html/pion_double.png' class='pion'> ";
						} else if (nb === partie[b].position && partie[a].compte === hote) {
							grille += "<img src = './html/pion_rouge.png' class='pion'> ";
						} else if (nb === partie[b].position && partie[a].compte !== hote) {
							grille += "<img src = './html/pion_bleu.png' class='pion'> ";
						}	
// MET LES EMPREINTES DE PAS DERRIÈRES LES PIONS LORSQU'ILS AVANCENT
					if (nb >= partie[b].position_temporaire && nb < partie[b].position && partie[b].compte === hote) {
						if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
							grille += "<img src = './html/petit_pas_haut_bleu.png' class='pion'>";
						} else {
							grille += "<img src = './html/petit_pas_droite_bleu.png' class='pion'>";
						}
					}
					if (nb >= partie[b].position_temporaire && nb < partie[b].position && partie[b].compte !== hote) {
						if (nb===10 || nb===20 || nb===30 || nb===40 || nb===50 || nb===60 || nb===70 || nb===80 || nb===90) {
							grille += "<img src = './html/petit_pas_haut_rouge.png' class='pion'>";
						} else {
							grille += "<img src = './html/petit_pas_droite_rouge.png' class='pion'>";
						}
					}										
					grille += "</td>";
				}

					grille += "</tr>\n";
					nb = nb - 9	;
			}	

	partie[b].position_temporaire = partie[b].position;
	partie[a].position_temporaire = partie[a].position;
			grille += '</table>';

//----------------------------------------------------------------
// AFFICHE UNE GRILLE SPÉCIFIQUE AU JOUEUR ACTIF (RETIRE LES EMPREINTES)
	} else {
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
						grille += "<img src = './html/pion_double.png' class='pion'>";	
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'>";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'>";
					}

					if (nb === partie[b].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png' class='pion' >";
					} else if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'> ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion' >";
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
						grille += "<img src = './html/pion_double.png' class='pion'> ";		
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'class='pion' >";
					}

					if (nb === partie[b].position && partie[a].compte === hote && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png'> class='pion' ";
					} else if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png'class='pion' > ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion' > ";
					}	
					grille += "</td>";
				}

				grille += "</tr>\n";
				nb = nb - 9	;
			}	

	partie[b].position_temporaire = partie[b].position;
	partie[a].position_temporaire = partie[a].position;
			grille += '</table>';

//----------------------------------------------------------------		
	}


// VERIFIE SI C'EST AU TOUR DU JOUEUR DE JOUER OU NON
	if (partie[a].tour === "actif") {
		page = fs.readFileSync('./html/res_joueur_actif.html', 'utf-8');
	} else {
		page = fs.readFileSync('./html/res_joueur_passif.html', 'utf-8');
	}

// VERIFIE SI LA PARTIE CONTINUE : QUELQU'UN A GAGNÉ ?
		if (partie[a].victoire === "gagner" || partie[b].victoire === "perdu") {
			page = fs.readFileSync('./html/res_gagner.html', 'utf-8');
		}
		if (partie[a].victoire === "perdu" || partie[b].victoire === "gagner") {
			page = fs.readFileSync('./html/res_perdu.html', 'utf-8');
		}		



// ECRITURE DU NOUVEAU JSON "salon.json"
	contenu_fichier = JSON.stringify(partie);
	fs.writeFileSync('./json/partie_en_cours/' + hote + '.json', contenu_fichier, 'utf-8');

	marqueurs = {};
	marqueurs.grille = grille;
	marqueurs.compte = compte;
	marqueurs.hote = hote;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait

