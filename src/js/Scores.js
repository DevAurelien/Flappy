const scoreElement = document.getElementById("affichage-score");
const levelElement = document.getElementById("affichage-level");

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
  static currentDate = this.date.toLocaleDateString("fr-FR");
  static currentLevel = 1;
  static bonus = 0;
  static malus = 0;
  static currentScore = 0;
  static currentDistance = 0;
  static currentDuration = 0;
  static multiplier = 1;
  static isCurrentLevelCompleted = false;

  static bestDate = 0;
  static bestScore = 0;
  static bestDistance = 0;
  static bestDuration = 0;
  static bestLevel = 1;
  static isBestLevelCompleted = false;

   /**
     * Initialise le scoreActuelle
     */
    static init() {
    this.currentScore = 0;
    this.recupererLocalStorage();
    levelElement.innerHTML = `${this.currentLevel}`
  }

  static incrementScore() {}  // En cours d'etude ....voir pour les points des bonus et malus
  
  static loadFromLocalStorage() {
    if (!localStorage.getItem("DataJoueur")) return;
    const { date, score, distance, duree, niveau, termine } = JSON.parse(
      localStorage.getItem("DataJoueur"),
    );
    this.bestDate = date;
    this.bestScore = score;
    this.bestDistance = distance;
    this.bestDuration = duree;
    this.bestLevel = niveau;
    this.isBestLevelCompleted = termine;
  }
  
  static saveToLocalStorage() {
    const playerData = {
      date: this.currentDate,
      score: this.currentScore,
      distance: this.currentDistance,
      duree: this.currentDuration,
      niveau: this.currentLevel,
      termine: this.isCurrentLevelCompleted,
    };
    localStorage.setItem("DataJoueur", JSON.stringify(playerData));
  }
}
