
import GameEvent from "./GameEvent.js";
import Ui from "./Ui.js";
import Player from "./Player.js";
import Renderer from "./Renderer.js";
import World from "./World.js";
import Background from "./Background.js";

export default class Game {

    // --- Game state ---
    static gameOver = false;
    static startPlay = false;
    static isStarting = false;

    // --- Animation ---
    static requestId = null;

    // --- Events ---
    static eventsRegistered = false;

    static async start() {
        Renderer.resize();

        await this.initGame();

        Renderer.draw();

        this.registerEvents();
    }

    static async initGame() {
        await Background.init(Renderer.width, Renderer.height);

        await Player.init(
            Renderer.width,
            Renderer.height,
            Background.groundY
        );
    }

    static registerEvents() {
        if (this.eventsRegistered) return;

        this.eventsRegistered = true;

        GameEvent.on("startPlay", (timestamp) => {
            this.startGame(timestamp);
        });

        GameEvent.on("playerDeath", () => {
            this.gameOver = true;

            cancelAnimationFrame(this.requestId);
            this.requestId = null;

            Ui.showOverlay();
        });

        GameEvent.on("playerJump", () => {
            Player.jump();
        });
    }

    static async startGame(timestamp) {
        if (this.isStarting || (this.startPlay && !this.gameOver)) return;

        this.isStarting = true;

        try {
            await this.initGame();

            Ui.hideBtnPlay();
            Ui.hideOverlay();

            World.initTime();

            this.gameOver = false;
            this.startPlay = true;

            this.loop(timestamp);

        } finally {
            this.isStarting = false;
        }
    }

    static loop(timestamp) {
        if (!this.startPlay || this.gameOver) return;

        World.update(timestamp);

        Background.update(World.deltaTime);

        Player.update(World.deltaTime, World.gravity);

        Renderer.draw();

        if (this.gameOver) return;

        this.requestId = requestAnimationFrame((timestamp) => {
            this.loop(timestamp);
        });
    }
}
