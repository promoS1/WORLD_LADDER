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


//-------------------------------------------------------------------------
	// CREATION DU PLATEAU DE JEU 
			grille = '<table width = "90%" id="table1">';
		
			nb = Number(101);
		
			for (colonne = 0; colonne < 5; colonne++) {
				grille += "<tr>";	

// LIGNE HORIZONTALES : 100; 80; 60; 40; 20; 
				for (ligne_1 = 0; ligne_1 < 10; ligne_1++) {
					nb = nb - 1;
					grille += "<td>";		
					if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'>";
					}
					if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png'> ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					}						
					grille += nb; 		grille += "</td>";
				}

				grille += "</tr>\n";	grille += "<tr>";	
				nb = nb - 11;

// LIGNE HORIZONTALES : 81; 61; 41; 21; 1;
				for (ligne_2 = 0; ligne_2 < 10; ligne_2++) {
					nb = nb + 1;
					grille += "<td>";	
					if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png'>";
					}
					if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png'> ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png'> ";
					}						
					grille += nb;	grille += "</td>";
				}

				grille += "</tr>\n";
				nb = nb - 9	;
			}	

			grille += '</table>';

//----------------------------------------------------------------





// VERIFIE SI C'EST AU TOUR DU JOUEUR DE JOUER OU NON
	if (partie[b].tour === "gagner") {
		page = fs.readFileSync('./html/res_perdu.html', 'utf-8');
	} else if (partie[a].tour === "actif") {
		page = fs.readFileSync('./html/res_joueur_actif.html', 'utf-8');
	} else {
		page = fs.readFileSync('./html/res_joueur_passif.html', 'utf-8');
	}



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

module.exports = trait;

