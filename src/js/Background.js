
import Ground from "./backgrounds/Ground.js";
import Moutain from "./backgrounds/Moutain.js";
import Sky from "./backgrounds/Sky.js";

export default class Background {

    static firstPlanVx = 5;

    static skyVx = 1;

    static get Ground(){
        return Ground;
    }

    static get Moutain(){
        return Moutain;
    }

    static async init(height) {
        await Ground.init(height);
        await Sky.init();
        await Moutain.init(Ground.y);
    }

    static update(deltaTime) {
        Sky.update(deltaTime, this.skyVx);
        Ground.update(deltaTime, this.firstPlanVx);
        Moutain.update(deltaTime, this.firstPlanVx);

    }

    static draw(ctx) {
        Sky.draw(ctx);
        Ground.draw(ctx);
        Moutain.draw(ctx);
    }

    static drawAABBbox(ctx) {
        Ground.drawAABBbox(ctx);
        Moutain.drawAABBbox(ctx);
    }
}
