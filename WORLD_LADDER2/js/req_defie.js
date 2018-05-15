"use strict"

var fs = require("fs");
require = ("remedial");

var trait = function (res, req, query) {
	var marqueurs;
	var contenu_fichier;
	var liste_membres;
	var nom_adversaire;
	var compte;
	var i;

	// LIRE LE JSON POUR VÉRIFIÉ LES JOUEURS PRÉSENT DANS LE SALON

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);

	nom_adversaire = query.adversaire;
	compte = query.compte;
	
//==================Modification de "état" du Json : "salon.json"============//
	
	for ( i = 0; liste_membres[i] < liste_membres[liste_membres.length]; i++) {
		if (liste_membres[i] === compte) {
			liste_membres[i].etat = "attente";	
		} else if ( liste_membres[i] === nom_adversaire ) {
			liste_membres[i].etat = "attente";			
		}
	}
	

//========================Ecriture du nouveau Json : "salon.json"===================================//

	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/salon.json", contenu_fichier, "utf-8");

	page = fs.readFileSync("./html/res_attendre_reponse.html", "utf-8");
	
	marqueurs = {};
	marqueurs.compte = compte;
	marqueurs.adversaire = nom_adversaire;
	marqueurs.mdp = query.mdp;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

}

//------------------------------------------------------------------------------------------------//

module.exports = trait;
