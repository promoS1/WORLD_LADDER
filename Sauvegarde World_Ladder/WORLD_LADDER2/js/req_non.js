/*"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var contenu_fichier;
	var liste_membres;
	var i;

	   // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    liste_membres = JSON.parse(contenu_fichier);

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			liste_membres[i].etat = "connecté";
*/
