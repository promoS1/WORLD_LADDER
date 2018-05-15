//=========================================================================
// Serveur
// Auteur : L'équipe de Word_Ladder
// Version : 24/04/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require('./js/req_commencer.js');
var req_confirmation_inscription = require("./js/req_confirmation_inscription.js");
var req_defie = require('./js/req_defie.js');
var req_gagner = require('./js/req_gagner.js');
var req_identifier = require('./js/req_identifier.js');
var req_modele_confirmation_inscription = require('./js/req_modele_confirmation_inscription.js');
var req_modele_formulaire_inscription = require('./js/req_modele_formulaire_inscription.js');
var req_non = require('./js/req_non.js');
var req_oui = require('./js/req_oui.js');
var req_oui2 = require('./js/req_oui2.js');
var req_perdu = require('./js/req_perdu.js');
var req_reponse_defie = require('./js/req_reponse_defie.js');
var req_sauter_pion = require('./js/req_sauter_pion.js');
var req_statique = require('./js/req_statique.js');
var req_erreur = require('./js/req_erreur.js');
var req_lancer = require('./js/req_lancer.js');
var req_deplacer_pion = require('./js/req_deplacer_pion.js');
var req_retour = require('./js/req_retour.js');
var req_attente_tour = require('./js/req_attente_tour.js');
var req_check = require('./js/req_check.js');
var req_reponse_joueur = require('./js/req_reponse_joueur.js');



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
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_confirmation_inscription':
				req_confirmation_inscription(req, res, query);
				break;
			case '/req_defie':
				req_defie(req, res, query);
				break;
			case '/req_dice':
				req_dice(req, res, query);
				break;
			case '/req_gagner':
				req_gagner(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_modele_confirmation_inscription':
				req_modele_confirmation_inscription(req, res, query);
				break;
			case '/req_modele_formulaire_inscription':
				req_modele_formulaire_inscription(req, res, query);
				break;
			case '/req_non':
				req_non(req, res, query);
				break;
			case '/oui':
				req_oui(req, res, query);
				break;
			case '/req_oui2':
				req_oui2(req, res, query);
				break;
			case '/req_perdu':
				req_perdu(req, res, query);
				break;
			case '/req_reponse_defie':
				req_reponse_defie(req, res, query);
				break;
			case '/req_sauter_pion' :
				req_sauter_pion(req, res, query);
				break;
			case '/req_lancer':
				req_lancer(req, res, query);
				break;
			case '/req_deplacer_pion':
				req_deplacer_pion(req, res, query);
				break;

			case '/req_retour':
				req_retour(req, res, query);
				break;
			case '/req_attente_tour':
				req_attente_tour(req, res, query);
				break;
			case '/req_check':
				req_check(req, res, query);
				break;
			case '/req_reponse_joueur':
				req_reponse_joueur(req, res, query);
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
