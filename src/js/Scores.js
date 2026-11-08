const scoreElement = document.getElementById("affichage-score");
const levelElement = document.getElementById("affichage-level");
const chronoElement = document.getElementById("affichage-chrono");
const distanceElement = document.getElementById("affichage-distance");
import GameEvent from "./GameEvent";

export default class Score {  //TODO : appeler saveToLocalStorage au moment de l'event LevelCompleted aussi plus tard pour save
  //   [
  //   {
  //     "date": 1793452800000,  // json de tentatives en localStorage, a filtrer et a mapper dessus
  //     "score": 19,
  //     "distance": 760,
  //     "duree": 42.5,
  //     "niveau": 1,
  //     "termine": false
  //   },
  //   {
  //     "date": 1793453000000,
  //     "score": 25,
  //     "distance": 1000,
  //     "duree": 55.2,
  //     "niveau": 1,
  //     "termine": true
  //   }
  // ]
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

  static isPlaying = false;
  static startTime = 0;
  static currrentTime = 0;
  static chronoInterval = null;

  /**
   * Initialise le scoreActuelle
   */
  static init() {
    this.currentScore = 0;
    this.loadFromLocalStorage();
    GameEvent.on("startPlay", (timestamp) => {
      console.log("partie démarrée à :", timestamp);
      this.isPlaying = true;
      this.startChrono(timestamp);
    });
    GameEvent.on("playerDeath", () => {
      this.isPlaying = false;
      this.currentDuration = (performance.now() - this.startTime) / 1000;
      this.stopChrono();
      this.saveToLocalStorage();
    });
    GameEvent.on("obstaclePassed", () => {
      this.updateScore();
    });
    levelElement.innerHTML = `${this.currentLevel}`;
  }

  static startChrono(timestamp) {
    this.startTime = timestamp;
    clearInterval(this.chronoInterval);
    this.chronoInterval = setInterval(() => {
      this.currentDuration = (performance.now() - this.startTime) / 1000;
      chronoElement.textContent = this.currentDuration.toFixed(1);
    }, 100);
  }

  static stopChrono() {
    clearInterval(this.chronoInterval);
    this.chronoInterval = null;
    this.timestamp = Date.now();
    this.date = new Date(this.timestamp);
    //date.toLocaleDateString("fr-FR")
    // this.currentDate = this.date.toLocaleDateString("fr-FR");
  }

  static resetSession() {
    clearInterval(this.chronoInterval);
    this.chronoInterval = null;
    this.currentDistance = 0;
    this.currentDuration = 0;
    this.currentScore = 0;
    this.isCurrentLevelCompleted = false;
    chronoElement.textContent = this.currentDuration.toFixed(1);
    scoreElement.textContent = this.currentScore;
    distanceElement.textContent = this.currentDistance;
  }

  static updateScore() {
    if (!this.isPlaying) return;
    this.currentScore++;
    scoreElement.textContent = this.currentScore;
  } // En cours d'etude ....voir pour les points des bonus et malus

static loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("DataJoueur") || "[]");

  if (!Array.isArray(data)) return;

  const tentatives = data.filter(
    tentative => tentative.niveau === this.currentLevel
  );

  if (tentatives.length === 0) return;

  const best = tentatives.reduce((meilleur, tentative) =>
    tentative.score > meilleur.score ? tentative : meilleur
  );

  this.bestDate = best.date;
  this.bestScore = best.score;
  this.bestDistance = best.distance;
  this.bestDuration = best.duree;
  this.bestLevel = best.niveau;
  this.isBestLevelCompleted = best.termine;
}

  static saveToLocalStorage() {
    let data = JSON.parse(localStorage.getItem("DataJoueur") || "[]");
    const playerData = {
      date: this.timestamp,
      score: this.currentScore,
      distance: this.currentDistance,
      duree: this.currentDuration,
      niveau: this.currentLevel,
      termine: this.isCurrentLevelCompleted,
    };
    data.push(playerData);
    localStorage.setItem("DataJoueur", JSON.stringify(data));
  }
}
