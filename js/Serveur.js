//=========================================================================
// Serveur
// Auteur : L'équipe de Starships
// Version : 16/01/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");

var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");
var submit_case = require("./submit_case.js");
var jouer_case = require("./jouer_case.js");
var req_placement = require("./req_placement.js");
var creer_partie = require("./creer_partie.js");


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;
	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/submit_case' :
				submit_case(req,res,query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_placement':
				req_placement(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
			case '/jouer_case':
				jouer_case(req, res, query);
				creer_partie(req,res,query);
				break;
			case '/req_gagner':
				req_gagner(req, res, query,);
				break;
			case '/req_perdu':
				req_perdu(req, res, query,);
				break;
			case '/img/bga_2.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bga_2.png"));
				res.end();
				break;
			case '/img/bg_place.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bg_place.png"));
				res.end();
				break;
			case '/img/bg_actif.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bg_actif.png"));
				res.end();
				break;
			case '/img/bg_regle.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bg_regle.png"));
				res.end();
				break;
			case '/img/bga.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bga.png"));
				res.end();
				break;
			case '/img/carree.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/carree.png"));
				res.end();
				break;
			case '/img/carre.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/carre.png"));
				res.end();
				break;
			case '/img/vert.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/vert.png"));
				res.end();
				break;
			case '/img/rouge.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/rouge.png"));
				res.end();
				break;
			case '/img/image_gagner.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/image_gagner.png"));
				res.end();
				break;
			case '/img/image_perdu.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/image_perdu.png"));
				res.end();
				break;
			case '/img/jaune.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/jaune.png"));
				res.end();
				break;
			case '/img/gris.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/gris.png"));
				res.end();
				
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
