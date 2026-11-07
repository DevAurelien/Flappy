
import Ground from "./backgrounds/Ground.js";
import Sky from "./backgrounds/Sky.js";

export default class Background {

    static get groundY() {
        return Ground.y;
    }

    static async init(width, height) {
        await Promise.all([
            Ground.init(width, height),
            Sky.init(width, height)
        ]);
    }

    static update(deltaTime) {
        Sky.update(deltaTime);
        Ground.update(deltaTime);
    }

    static draw(ctx) {
        Sky.draw(ctx);
        Ground.draw(ctx);
    }
}
