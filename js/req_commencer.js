//=========================================================================
// Traitement de "req_commencer"
// Auteur : L'équipe de Word_Ladder
// Version : 24/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	


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
