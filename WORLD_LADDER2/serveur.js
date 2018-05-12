//=========================================================================
// Serveur
// Auteur : L'équipe de Word_Ladder
// Version : 24/04/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;
var querystring = require("querystring");
var fs = require("fs");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./js/req_commencer.js");
var req_confirmation_inscription = require("./js/req_confirmation_inscription.js");
var req_defie = require("./js/req_defie.js");
var req_dice = require("./js/req_dice.js");
var req_gagner = require("./js/req_gagner.js");
var req_identifier = require("./js/req_identifier.js");
var req_modele_confirmation_inscription = require("./js/req_modele_confirmation_inscription.js");
var req_modele_formulaire_inscription = require("./js/req_modele_formulaire_inscription.js");
var req_non = require("./js/req_non.js");
var req_oui = require("./js/req_oui.js");
var req_oui2 = require("./js/req_oui2.js");
var req_perdu = require("./js/req_perdu.js");
var req_reponse_defie = require("./js/req_reponse_defie.js");



var req_statique = require("./js/req_statique.js");
var req_erreur = require("./js/req_erreur.js");


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {
	var ressource;
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
			case "./js/req_commencer.js":
				req_commencer(req, res, query);
				break;
			case "./js/req_confirmation_inscription.js":
				req_confirmation_inscription(req, res, query);
				break;
			case "./js/req_defie.js":
				req_defie(req, res, query);
				break;
			case "./js/req_dice.js":
				req_dice(req, res, query);
				break;
			case "./js/req_gagner.js":
				req_gagner(req, res, query);
				break;
			case "./js/req_identifier.js":
				req_identifier(req, res, query);
				break;
			case "./js/req_modele_confirmation_inscription.js":
				req_modele_confirmation_inscription(req, res, query);
				break;
			case "./js/req_modele_formulaire_inscription.js":
				req_modele_formulaire_inscription(req, res, query);
				break;
			case "./js/req_non.js":
				req_non(req, res, query);
				break;
			case "./js/oui.js":
				req_oui(req, res, query);
				break;


			case './js/req_oui2.js':
				req_oui2(req, res, query);
				break;
			case './js/req_perdu.js':
				req_perdu(req, res, query);
				break;
			case './js/req_reponse_defie.js':
				req_reponse_defie(req, res, query);
				break;
			default:
				req_statique(req, res, pathname);
				break;
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
