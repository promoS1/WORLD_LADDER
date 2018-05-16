"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs={};
    var compte;
    var page;
    var i;
    var trouve;
	var membre_co_salon;
	var contenu_fichier;
	var liste_membres;
	var liste;
	var test = false;
	
	// RECUPERATION DU JSON "salon.json"

		contenu_fichier = fs.readFileSync("./json/salon.json", 'utf-8');
		liste_membres = JSON.parse(contenu_fichier);

	// Premier cas, le joueur est déjà dans le salon

		for(i = 0; i < liste_membres.length; i++){
			if(liste_membres[i].compte === query.compte){
				test = true;
				liste_membres[i].etat = "connecté";
				contenu_fichier = JSON.stringify(liste_membres);
				fs.writeFileSync("./json/salon.json", contenu_fichier, 'utf-8');
			}
		} 

	//Second cas, le joueur n'y était pas 

		if(test === false){
			membre_co_salon = {};
			membre_co_salon.compte = query.compte;
			membre_co_salon.etat = "connecté";
			membre_co_salon.adversaire = "non";
			liste_membres.push(membre_co_salon);

			contenu_fichier = JSON.stringify(liste_membres);
			fs.writeFileSync("./json/salon.json", contenu_fichier, 'utf-8');
		}

		page = fs.readFileSync('./html/res_salon.html', 'UTF-8');

		liste= "";
		for (i = 0; i < liste_membres.length; i++) {
			if (liste_membres[i].compte !== query.compte && liste_membres[i].etat === "connecté") {
				liste += "<form action = 'req_defie' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type = 'hidden' name ='adversaire' value='"+ liste_membres[i].compte +"'><input type='submit' name='adversaire' value='"+ liste_membres[i].compte +"</form>";
			}
					
		}
	
        marqueurs.compte = query.compte;
		marqueurs.adversaire = query.adversaire;
		marqueurs.joueurs = liste;
        page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

//---------------------------------------------------------------------------

module.exports = trait; 

