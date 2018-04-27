"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var password;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var connected;
	var check;
	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE
	check = false;
	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].password === query.password) {
				if (listeMembres[i].statut === "true") {
					check = true;
					trouve = true;
				} else {
					trouve = true;
					listeMembres[i].statut = "true";
					contenu_fichier = JSON.stringify(listeMembres);
					fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
				}
			}

		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false){
		// SI IDENTIFICATION INCORRECT 

		page = fs.readFileSync('modele_accueil.html','utf-8');

		marqueurs = {};
		marqueurs.erreur = "<div class='dark-matter1'>" + "Le compte est déjà connecté" +"</div>";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else { 
		// Si identification ok

		page = fs.readFIleSync('salon.html', 'UFT-8');

		marqueurs = {};
		marqueurs.date = moment ().format('LLL');
		marqueurs.pseudo = query.pseudo;
		page = page.supllant(marqueurs);
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//----------------------------------------------------------------------------
module.exports = trait;
