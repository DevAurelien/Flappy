const affichageScore = document.getElementById("affichage-score");
const affichageLevel = document.getElementById("affichage-level");

export default class Score {
  /*
    Le score affiché est celui du niveau en cours, +1 au score pour chaque paire d'obstacles franchi, 
    distance nombre de mètres parcouru dans le niveau
    temps duree de la tentatives en secondes
   Objet à convertir avec JSON.stringify() :
  {
    date: 1793452800000, // number  : timestamp Date.now() en millisecondes
    score: 125,          // number  : score obtenu lors de la tentative
    distance: 845,       // number  : distance parcourue en mètres
    duree: 72.5,         // number  : durée de la tentative en secondes
    niveau: 1,           // number  : identifiant du niveau
    termine: false       // boolean : true = terminé, false = mort
  }*/
  static timestamp = Date.now();
  static date = new Date(this.timestamp);
  //date.toLocaleDateString("fr-FR")
  static dateActuelle = this.date.toLocaleDateString("fr-FR");
  static niveauActuelle = 1;
  static bonus = 0;
  static malus = 0;
  static scoreActuel = 0;
  static distanceActuelle = 0;
  static dureeActuelle = 0;
  static multiplicateur = 1;
  static niveauTermineActuel = false;

  static meilleurDate = 0;
  static meilleurScore = 0;
  static meilleurDistance = 0;
  static meilleurDuree = 0;
  static meilleurNiveau = 1;
  static meilleurTermine = false;

   /**
     * Initialise le scoreActuelle
     */
    static init() {
    this.scoreActuel = 0;
    this.recupererLocalStorage();
    affichageLevel.innerHTML = `${this.niveauActuelle}`
  }

  static modifierScore() {}
  
  static recupererLocalStorage() {
    if (!localStorage.getItem("DataJoueur")) return;
    const { date, score, distance, duree, niveau, termine } = JSON.parse(
      localStorage.getItem("DataJoueur"),
    );
    this.meilleurDate = date;
    this.meilleurScore = score;
    this.meilleurDistance = distance;
    this.meilleurDuree = duree;
    this.meilleurNiveau = niveau;
    this.meilleurTermine = termine;
  }
  
  static envoyerLocalStorage() {
    const objJoueur = {
      date: this.dateActuelle,
      score: this.scoreActuel,
      distance: this.distanceActuelle,
      duree: this.dureeActuelle,
      niveau: this.niveauActuelle,
      termine: this.niveauTermineActuel,
    };
    localStorage.setItem("DataJoueur", JSON.stringify(objJoueur));
  }
}
