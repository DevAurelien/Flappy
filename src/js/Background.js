
import Ground from "./backgrounds/Ground.js";
import Mountains from "./backgrounds/Mountain.js";
import Sky from "./backgrounds/Sky.js";

export default class Background {

    static firstPlanVx = 5;

    static skyVx = 1;

    static get Ground() {
        return Ground;
    }

    static get Mountains() {
        return Mountains;
    }

    static async init(height) {
        await Ground.init(height);
        await Sky.init();
        await Mountains.init(Ground.y);
    }

    static update(deltaTime) {
        Sky.update(deltaTime, this.skyVx);
        Ground.update(deltaTime, this.firstPlanVx);
        Mountains.update(deltaTime, this.firstPlanVx);

    }

    static draw(ctx) {

        Sky.draw(ctx);
        Ground.draw(ctx);
        Mountains.draw(ctx);
        
    }

    static drawAABBbox(ctx) {
        Ground.drawAABBbox(ctx);
    }
}
