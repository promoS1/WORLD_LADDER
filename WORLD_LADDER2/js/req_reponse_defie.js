"use strict";

var fs = require("fs");
var moment = require('moment');
require('remedial');


var trait = function(req, res, query) {

	var contenu_fichier;
	var membres_connecte_salon;

//Liste de membres connectés au Salon de joueurs

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8")
	membres_connecte_salon = JSON.parse(contenu_fichier);

	




	page = fs.readFileSync('./html/res_salon.html','utf-8');


	marqueurs = {};
	marqueurs.pseudo = query.compte;
	marqueurs.mdp = query.mdp;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;
