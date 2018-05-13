"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
    var i;
    var trouve;
	var test = false;
	


    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

    trouve = false;
    i = 0;
    while(i < listeMembres.length && trouve === false) {
        if(listeMembres[i].compte === query.compte) {
            if(listeMembres[i].mdp === query.mdp) {
                trouve = true;
            }
        }
        i++;
    }

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === false) {
        // SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

        page = fs.readFileSync('./html/res_modele_accueil2.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else if (trouve === true) {
        // SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

		page = fs.readFileSync('./html/res_salon.html', 'UTF-8');
		

//==============================================================================================//
//PREPARATION DE LA LISTE DE MEMBRE CONNECTE EN TEMPS REEL//

		var membre_co_salon;
		var contenu_fichier2;
		var liste_fichier2;
		var liste_temps_reel;
		var liste;
		
	
//========================== Récupération des informatons du lobby =============================\\

		contenu_fichier2 = fs.readFileSync("./json/salon.json", 'utf-8');
		liste_temps_reel = JSON.parse(contenu_fichier2);

//========================== Premier cas, le joueur est déjà dans le salon ======================\\

		for(i = 0; i < liste_temps_reel.length; i++){
			if(liste_temps_reel[i].compte === query.compte){
				test = true;
				liste_temps_reel[i].etat = "connecté";
				contenu_fichier2 = JSON.stringify(liste_temps_reel);
				fs.writeFileSync("./json/salon.json", contenu_fichier2, 'utf-8');
			}
		} 

//========================= Second cas, le joueur n'y était pas ==================================\\
		if(test === false){
			membre_co_salon = {};
			membre_co_salon.compte = query.compte;
			membre_co_salon.etat = "connecté";
			membre_co_salon.libre = "oui";
			liste_temps_reel.push(membre_co_salon);

			contenu_fichier2 = JSON.stringify(liste_temps_reel);
			fs.writeFileSync("./json/salon.json", contenu_fichier2, 'utf-8');
		}

		page = fs.readFileSync('./html/res_salon.html', 'UTF-8');

		liste= "";
		for (i = 0; i < liste_temps_reel.length; i++) {
			if (liste_temps_reel[i].compte !== query.compte && liste_temps_reel[i].etat === "connecté") {
				liste += "<form action='./js/req_reponse_defie.js' method='GET'><input type ='hidden' name='compte' value='"+ query.compte +"'><input type ='hidden' name ='libre' value='"+ liste_temps_reel[i].compte +"'><button class='button1' name='action' value=''>" + liste_temps_reel[i].compte + "</button></form>";
			}
					

		}
	
	}
		marqueurs = {};
        marqueurs.compte = query.compte;
        marqueurs.mdp = query.mdp;
		marqueurs.joueurs = liste

        page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

//---------------------------------------------------------------------------

module.exports = trait;
