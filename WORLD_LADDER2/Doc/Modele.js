"use strict"

var fs = require("fs");
var url = require ("url");
require = ("remedial");

var trait = function (req, res, query) {

	var
	var
	var

	// LIRE LE JSON POUR VÉRIFIÉ LES JOUEURS PRÉSENT DANS LE SALON

	contenu_fichier = fs.readFileSync("./json/salon.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);









	page = fs.readFileSync("./html/res_........html", "utf-8");
	page = page.supplant(marqueurs);
   
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
