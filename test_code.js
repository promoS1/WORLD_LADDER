"use strict"

	var grille;
	var ligne;
	var colonne;

	grille = "<table>";
	
	for (ligne =0 ; ligne < 9; ligne++) {
		grille += "<tr>\n";	
		for (colonne=0; colonne < 9; colonne++) {
			grille += "</tr>";
			grille += "<td>"
// INSCRIRE ICI LES CONDITIONS DE JEU

/*			if ( INSCRICRE CONDITIONS ) {
			} else if ( INSCRIRE CONDITIONS ) {
				grille += "</td>\n";
			}
			grille += "</tr>"
*/
		}
	marqueurs = {};
	marqueurs.grille = grille;
	
