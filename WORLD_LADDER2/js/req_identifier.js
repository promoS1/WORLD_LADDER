"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
    var i;
    var trouve;


    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

    trouve = false;
    i = 0;
    while(i < listeMembres.length && trouve === false) {
        if(listeMembres[i].compte === query.compte) {
            if(listeMembres[i].mdp === query.mdp) {
                trouve = true;
            }
        }
        i++;
    }

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === false) {
        // SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

        page = fs.readFileSync('./html/res_modele_accueil2.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else if (trouve === true) {
        // SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

        page = fs.readFileSync('./html/res_salon.html', 'UTF-8');







    }
    



    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

//---------------------------------------------------------------------------

module.exports = trait;
