export default class GameEvent {

    static startPlay = false;

    static btnJouer = document.getElementById('btn-jouer');

    static player = null;

    static init(player) {
        this.player = player;
        this.bindEvent();
    }

    static bindEvent() {

        this.btnJouer.addEventListener('click', (e) => {
            e.stopPropagation();
            this.btnJouer.style.visibility = 'hidden';
            this.startPlay = true;
        })

        document.addEventListener("click", (e) => {
            if (this.startPlay) {
                this.player.jump();
            }
        })
    }
}