import GameEvent from "./GameEvent";
const sonPlayerElement = document.querySelector(".son-player");
const sonBruitagesElement = document.querySelector(".bruitages");
const levelElement = document.getElementById("affichage-level");
const baliseMenu = document.querySelector("audio.menu");
const baliseNiv1 = document.querySelector("audio.niv1");
const baliseNiv2 = document.querySelector("audio.niv2");
const baliseNiv3 = document.querySelector("audio.niv3");
const baliseNiv4 = document.querySelector("audio.niv4");
const balisesAudio = document.querySelectorAll("audio");
import sonBurst from "../assets/sounds/jetpack.ogg";
import ambianceMenu from "../assets/sounds/menuADVENTURE.ogg";
import ambianceLvl1 from "../assets/sounds/lvl1CORALREEF.ogg";
import boing from "../assets/sounds/boing.ogg";
import crash from "../assets/sounds/crash.ogg";

export default class Audio {
  static level = { 0: ambianceMenu, 1: ambianceLvl1 };
  static baliseMenu = baliseMenu;
  static baliseNiv1 = baliseNiv1;
  static baliseNiv2 = baliseNiv2;
  static baliseNiv3 = baliseNiv3;
  static baliseNiv4 = baliseNiv4;
  static volumeCurseur = 0.1;
  // static volumeCurseur = 0; // pour qu'il ferme sa bouche quand on debug
  static volumeJoueur = 0.2;
  static volumeMax = 1;
  static volumeMin = 0;
  static transitionTimers = [];
  static bruitagesTimers = [];
  static jetpackTimer = null;
  static jetpackEnMontee = false;

  static init() {
    baliseMenu.volume = 0;
    baliseNiv1.volume = 0;
    baliseNiv2.volume = 0;
    baliseNiv3.volume = 0;
    baliseNiv4.volume = 0;

    GameEvent.on("startPlay", (timestamp) => {
      this.annulerTransitions();
      baliseNiv1.volume = this.volumeMin;
      this.playAmbianceSound(baliseNiv1, 1);
      this.fadeIn(baliseNiv1, 2000, this.volumeCurseur);
      this.transitionTimers.push(
        setTimeout(() => {
          this.fadeOut(baliseMenu, 1000, this.volumeMin);
        }, 1000),
        setTimeout(() => {
          baliseMenu.pause();
        }, 2000),
      );
    });

    GameEvent.on("playerDeath", () => {
      this.annulerTransitions();
      this.playBruitagesSound(crash);
      baliseMenu.volume = this.volumeMin;
      const audioEnCours = Array.from(balisesAudio).find(
        (item) =>
          !item.paused &&
          !item.classList.contains("son-player") &&
          item != baliseMenu &&
          !item.classList.contains("bruitages"),
      );

      if (audioEnCours) {
        this.transitionTimers.push(
          setTimeout(
            () => this.fadeOut(audioEnCours, 2000, this.volumeMin),
            1000,
          ),
          setTimeout(() => {
            audioEnCours.pause();
          }, 3000),
        );
      }
      this.playAmbianceSound(baliseMenu, 0);
      this.fadeIn(baliseMenu, 5000, this.volumeCurseur);
    });

    GameEvent.on("playerJump", () => {
      this.playPlayerSound();
    });
  }

  /**
   * Lance la musique d'ambiance correspondant au niveau sélectionné.
   *
   * @param {number} level
   */
  static playAmbianceSound(baliseHtmlAudio, level = 0) {
    //sonAmbianceElement.playbackRate =  // defaut = 1, accelerer ou ralentir le son en cas de bonus ou malus
    //sonAmbianceElement.preservesPitch = false // evite la montée des aigus pendant l'acceleration musicale
    if (baliseHtmlAudio.getAttribute("src") !== this.level[level]) {
      baliseHtmlAudio.src = this.level[level];
    }

    baliseHtmlAudio.play();
    // baliseHtmlAudio.playbackRate = 1.3;
    baliseHtmlAudio.loop = true;
  }

  static playPlayerSound() {
    if (this.jetpackEnMontee) return;
    if (!sonPlayerElement.paused && sonPlayerElement.volume > 0.15) return;
    clearTimeout(this.jetpackTimer);
    if (!sonPlayerElement.getAttribute("src")) {
      sonPlayerElement.src = sonBurst;
    }
    sonPlayerElement.volume = 0;
    sonPlayerElement.currentTime = 0;
    sonPlayerElement.play();
    this.jetpackEnMontee = true;
    this.fadeIn(sonPlayerElement, 300, this.volumeCurseur);

    this.jetpackTimer = setTimeout(() => {
      this.jetpackEnMontee = false;
      this.fadeOut(sonPlayerElement, 1000, this.volumeMin);
      this.jetpackTimer = null;
    }, 300);
  }

  static playBruitagesSound(sound = boing) {
    this.bruitagesTimers.forEach(clearTimeout);
    if (sonBruitagesElement.src != sound) sonBruitagesElement.src = sound;
    sonBruitagesElement.volume = 0;
    sonBruitagesElement.currentTime = 0;
    sonBruitagesElement.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
    this.fadeIn(sonBruitagesElement, 10, this.volumeCurseur);

    this.bruitagesTimers.push(
      setTimeout(() => {
        this.fadeOut(sonBruitagesElement, 500, this.volumeMin);
      }, 1000),
      setTimeout(() => {
        sonBruitagesElement.pause();
      }, 1510),
    );
  }

  /**
   * Baisse le volume de actuel à min.
   * @param {HTMLAudioElement} baliseHtmlAudio
   * @param {number} duration Durée en ms 10000 par defaut
   */
  static fadeOut(baliseHtmlAudio, duration = 10000, min = this.volumeMin) {
    min = Math.max(0, Math.min(1, min));
    if (baliseHtmlAudio.requestId != null) {
      cancelAnimationFrame(baliseHtmlAudio.requestId);
    }
    if (duration <= 0) {
      baliseHtmlAudio.volume = 0;
      baliseHtmlAudio.requestId = null;
      return;
    }
    const volumeInitial = baliseHtmlAudio.volume;
    const startTime = performance.now();
    const animate = (timestamp) => {
      const elapsedTime = Math.max(0, timestamp - startTime);
      baliseHtmlAudio.volume = Math.max(
        volumeInitial - (elapsedTime * volumeInitial) / duration,
        min,
      );
      if (baliseHtmlAudio.volume > min) {
        baliseHtmlAudio.requestId = requestAnimationFrame(animate);
      } else {
        baliseHtmlAudio.requestId = null;
      }
    };
    baliseHtmlAudio.requestId = requestAnimationFrame(animate);
  }

  /**
   * Augmente le volume de actuel à max.
   * @param {HTMLAudioElement} baliseHtmlAudio
   * @param {number} duration Durée en ms 10000 par defaut
   */
  static fadeIn(baliseHtmlAudio, duration = 10000, max = this.volumeCurseur) {
    if (baliseHtmlAudio.requestId != null) {
      cancelAnimationFrame(baliseHtmlAudio.requestId);
    }
    if (duration <= 0) {
      baliseHtmlAudio.volume = max;
      baliseHtmlAudio.requestId = null;
      return;
    }
    const volumeInitial = baliseHtmlAudio.volume;
    const volumeFinal = max;
    const startTime = performance.now();
    const animate = (timestamp) => {
      const elapsedTime = Math.max(0, timestamp - startTime);
      baliseHtmlAudio.volume = Math.min(
        volumeInitial +
          (elapsedTime * (volumeFinal - volumeInitial)) / duration,
        volumeFinal,
      );
      if (baliseHtmlAudio.volume < volumeFinal) {
        baliseHtmlAudio.requestId = requestAnimationFrame(animate);
      } else {
        baliseHtmlAudio.requestId = null;
      }
    };
    baliseHtmlAudio.requestId = requestAnimationFrame(animate);
  }
  static annulerTransitions() {
    this.transitionTimers.forEach(clearTimeout);
    this.transitionTimers = [];
  }
}
