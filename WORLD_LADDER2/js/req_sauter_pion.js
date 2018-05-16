"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE déé qui tourne 

	page = fs.readFileSync('./html/res_page_conditions.html', 'utf-8');



	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.compte = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

