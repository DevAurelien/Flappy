import GameEvent from "./GameEvent";
const sonAmbianceElement = document.querySelector(".son-ambiance");
const sonPlayerElement = document.querySelector(".son_player");
const levelElement = document.getElementById("affichage-level");
const baliseAudio = document.querySelectorAll("baliseAudio");
import sonBurst from "../assets/sounds/burst2.wav";
import ambianceMenu from "../assets/sounds/menuADVENTURE.ogg";
import ambianceLvl1 from "../assets/sounds/lvl1CORALREEF.ogg";


export default class Audio {
  static level = { 0: ambianceMenu, 1: ambianceLvl1 };
  static currentAmbianceMusic = "";

  static init() {
    GameEvent.on("startPlay", (timestamp) => {
      const audio = baliseAudio.find((item)=> (item.src = "" && !item.class === "son_player"))
      this.playAmbianceSound(audio, 1);
    });
    GameEvent.on("playerDeath", () => {
      const audio = baliseAudio.find((item)=> (item.src != "" && item.class != "son_player"))
      if(audio.volume === 1) this.fadeOut(audio);
      this.playAmbianceSound(0);
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
  static playAmbianceSound(who, level = 0) {
    //sonAmbianceElement.playbackRate =  // defaut = 1, accelerer ou ralentir le son en cas de bonus ou malus
    //sonAmbianceElement.preservesPitch = false // evite la montée des aigus pendant l'acceleration musicale
    who.src = this.level[level];
    this.fadeIn(who);
    this.fadeOut(this.currentAmbianceMusic);
    who.play();
    who.loop = true;
  }
  static pauseAmbianceSound() {}
  static increaseAmbianceSound() {}
  static decreaseAmbianceSound() {}

  static playPlayerSound() {
    sonPlayerElement.src = sonBurst;
    sonPlayerElement.volume = 0.2;
    sonPlayerElement.play();
  }
  static pausePlayerSound() {
    sonPlayerElement.pause();
  }
  /**
 * Baisse le volume de 1 à 0.
 * @param {HTMLAudioElement} who
 * @param {number} duration Durée en ms 10000 par defaut
 */
static fadeOut(who, duration = 10000) {
    if (who.requestId != null) {
        cancelAnimationFrame(who.requestId);
    }
    if (duration <= 0) {
        who.volume = 0;
        who.requestId = null;
        return;
    }
    const volumeInitial = who.volume;
    const startTime = performance.now();
    const animate = (timestamp) => {
        const elapsedTime = timestamp - startTime;
        who.volume = Math.max(
            volumeInitial - (elapsedTime * volumeInitial / duration),
            0,
        );
        if (who.volume > 0) {
            who.requestId = requestAnimationFrame(animate);
        } else {
            who.requestId = null;
        }
    };
    who.requestId = requestAnimationFrame(animate);
}

/**
 * Augmente le volume de 0 à 1.
 * @param {HTMLAudioElement} who
 * @param {number} duration Durée en ms 10000 par defaut
 */
static fadeIn(who, duration = 10000) {
    if (who.requestId != null) {
        cancelAnimationFrame(who.requestId);
    }
    if (duration <= 0) {
        who.volume = 1;
        who.requestId = null;
        return;
    }
    const volumeInitial = who.volume;
    const volumeFinal = 1;
    const startTime = performance.now();
    const animate = (timestamp) => {
        const elapsedTime = timestamp - startTime;
        who.volume = Math.min(
            volumeInitial + (elapsedTime * (volumeFinal - volumeInitial) / duration),
            volumeFinal,
        );
        if (who.volume < volumeFinal) {
            who.requestId = requestAnimationFrame(animate);
        } else {
            who.requestId = null;
        }
    };
    who.requestId = requestAnimationFrame(animate);
}
}
