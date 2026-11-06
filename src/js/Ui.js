export default class Ui {

    static btnPlay = document.getElementById("btn-jouer");
    static overlay = document.getElementById("overlay");

    static btnRetry = null;

    static hideBtnPlay() {
        this.btnPlay.style.visibility = "hidden";
    }

    static showOverlay() {
        const cadreOverlay = document.createElement("div");
        cadreOverlay.classList.add("cadre-overlay");
        cadreOverlay.innerHTML = `
        <p id="game-over-title">Game Over</p>
        <p id="btn-retry">Réessayer</p>
`;
        this.overlay.appendChild(cadreOverlay);

        this.btnRetry = cadreOverlay;
    }

    static hideOverlay(){
        this.overlay.innerHTML = ""
    }
}