"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var contenu_fichier2;
	var partie;
	var liste_membres;
	var adversaire;
	var i;
	var a;
	var b;
	var compte;
	var hote;
	var grille;
	var nb;
	var ligne_1;
	var ligne_2;
	var colonne;
	var page;
	var marqueurs;


	// LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier2 = fs.readFileSync("./json/salon.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier2);

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			a = i;
			hote = liste_membres[i].hote;
			adversaire = liste_membres[i].adversaire;
			if (liste_membres[i].etat === "connecté") {
				page = fs.readFileSync('./html/res_refus.html','utf-8');
			} else if (liste_membres[i].etat === "joue") {
				page = fs.readFileSync("./html/res_joueur_passif.html", "utf-8");
			} else {
				page = fs.readFileSync("./html/res_attendre_reponse.html", "utf-8");
			}
		}
	}


if (liste_membres[a].etat === "joue") {

// LECTURE DU JSON "{hote}.json"
	contenu_fichier = fs.readFileSync("./json/partie_en_cours/" + hote + ".json", "utf-8");
	partie = JSON.parse(contenu_fichier);


// IDENTIFICATION DE LA POSITION DU JOUEUR VIA LE JSON "{hote}.json"
	for (i = 0; i < partie.length; i++) {
		if (partie[i].compte === compte) {
			a = i;
			partie[a].position_temporaire = 1;
			partie[a].prison = 0;
		} else {
			b = i;
			partie[b].position_temporaire = 1;
			partie[b].prison = 0;
		}
	}


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
					if (nb === partie[a].position && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png' class='pion'>";	
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'>";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'>";
					}

					if (nb === partie[b].position && partie[b].position === partie[a].position) {
						grille+= "";
					} else if (nb === partie[b].position && partie[a].compte === hote) {
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
					if (nb === partie[a].position && partie[a].position === partie[b].position) {
						grille += "<img src = './html/pion_double.png' class='pion'>";	
					} else if (nb === partie[a].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion'>";
					} else if (nb === partie[a].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'>";
					}

					if (nb === partie[b].position && partie[b].position === partie[a].position) {
						grille+= "";
					} else if (nb === partie[b].position && partie[a].compte === hote) {
						grille += "<img src = './html/pion_rouge.png' class='pion'> ";
					} else if (nb === partie[b].position && partie[a].compte !== hote) {
						grille += "<img src = './html/pion_bleu.png' class='pion' >";
					}						
					grille += "</td>";
				}

				grille += "</tr>\n";
				nb = nb - 9	;
			}		

			grille += '</table>';

//----------------------------------------------------------------

	contenu_fichier = JSON.stringify(partie);
	fs.writeFileSync("./json/partie_en_cours/" + hote + ".json", contenu_fichier, "utf-8");
}

	marqueurs = {};
	marqueurs.grille = grille;
	marqueurs.joueur = query.joueur;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	marqueurs.hote = hote;

	page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

module.exports = trait;

