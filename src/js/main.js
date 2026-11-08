import Game from "./Game.js";
import GameEvent from "./GameEvent.js";
import Renderer from "./Renderer.js";
import Ui from "./Ui.js";

Game.start();

Ui.btnPlay.addEventListener("click", () => {
    GameEvent.emit("startPlay", performance.now());
});

Ui.overlay.addEventListener("click", (e) => {
    if (e.target.id === "btn-retry") {
        GameEvent.emit("startPlay", performance.now());
    }
});

Renderer.canvas.addEventListener("click", () => {
    GameEvent.emit("playerJump");
});