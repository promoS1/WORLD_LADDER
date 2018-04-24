//=========================================================================
// Traitement de "req_commencer"
// Auteur : L'équipe de Starships
// Version : 16/01/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	

	//CLEAR DU JSON


	var modele = fs.readFileSync("../json/modele.json",'utf-8');
	var contenu_modele = JSON.parse(modele);

	var json = fs.readFileSync("../json/etat_partie.json",'utf-8');
	var contenu_json = JSON.parse(json);

	contenu_json = contenu_modele;
	
	json = JSON.stringify(contenu_json);
	fs.writeFileSync("../json/etat_partie.json",json,'utf-8');
	
	////////////////

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('../html/modele_accueil.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
