import Canvas from "./Canvas.js";
import Player from "./Player.js";
import GameEvent from "./GameEvent.js";
import World from "./World.js";

Canvas.resize();

Player.init(Canvas, Canvas.ctx);
GameEvent.init(Player);

const game = (timestamp) => {
    World.update(timestamp)

    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    if (GameEvent.startPlay) {
        Player.update(World.deltaTime, World.gravity);
        Player.draw();
    }

    requestAnimationFrame(game);
};

game(performance.now());

window.addEventListener("resize", Canvas.resize);