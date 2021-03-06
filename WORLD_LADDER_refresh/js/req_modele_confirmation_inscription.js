//=========================================================================
// Traitement de "req_inscrire"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var nouveauMembre;
    var contenu_fichier;
    var listeMembres;
    var i;
    var trouve;

    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

    trouve = false;
    i = 0;
    while(i<listeMembres.length && trouve === false) {
        if(listeMembres[i].compte === query.compte) {
            trouve = true;
        }
        i++;
    }

    // SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

    if(trouve === false) {
        nouveauMembre = {};
        nouveauMembre.compte = query.compte;
        nouveauMembre.mdp = query.mdp;
        listeMembres[listeMembres.length] = nouveauMembre;

        contenu_fichier = JSON.stringify(listeMembres);

        fs.writeFileSync("./json/membres.json", contenu_fichier, 'utf-8');
    }
    

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === true) {
        // SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

        page = fs.readFileSync('./html/res_modele_formulaire_inscription2.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : ce compte existe déjà";

        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else {
        // SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

        page = fs.readFileSync('./html/res_modele_confirmation_inscription.html', 'UTF-8');

        marqueurs = {};
        marqueurs.compte = query.compte;
        marqueurs.mdp = query.mdp;
        page = page.supplant(marqueurs);
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
