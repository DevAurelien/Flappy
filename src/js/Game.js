import GameEvent from "./GameEvent.js";
import Ui from "./Ui.js";
import Player from "./Player.js";
import Renderer from "./Renderer.js";
import World from "./World.js";

export default class Game {

    static gameOver = false;
    static startPlay = false;
    static requestId = null;

    static start() {

        Renderer.resize();

        GameEvent.on("startPlay", (timestamp) => {
            if (this.startPlay && !this.gameOver) return;

            Player.init(Renderer.width, Renderer.height);
            Ui.hideBtnPlay();
            Ui.hideOverlay();

            World.initTime();

            this.gameOver = false;
            this.startPlay = true;

            this.loop(timestamp);
        });

        GameEvent.on("playerDeath", () => {
            this.gameOver = true;

            cancelAnimationFrame(this.requestId);

            Ui.showOverlay();
        });

        GameEvent.on("playerJump", () => {
            Player.jump();
        })

    }

    static loop(timestamp) {
        if (!this.startPlay || this.gameOver) return;

        World.update(timestamp);

        Player.update(World.deltaTime, World.gravity);

        Renderer.draw();

        if (this.gameOver) return;

        this.requestId = requestAnimationFrame((timestamp) => {
            this.loop(timestamp);
        });
    }
}