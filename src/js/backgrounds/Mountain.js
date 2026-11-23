import Renderer from "../Renderer";
import MountainsBottom from "./mountains/MountainsBottom";
import MountainsTop from "./mountains/MountainsTop";


export default class Mountains {


    static get MountainsTop() {
        return MountainsTop;
    }

    static get MountainsBottom() {
        return MountainsBottom;
    }
    
    static randomNumber; 

    static async init(height) {
        MountainsBottom.init(height, this.randomNumber);
        MountainsTop.init(this.randomNumber);
        this.randomNumber = Math.random() * window.innerWidth + Renderer.width;
    }

    static draw(ctx) {
        MountainsBottom.draw(ctx);
        MountainsTop.draw(ctx);
    }

    static update(deltaTime, firstPlanVx) {
        MountainsBottom.update(deltaTime, firstPlanVx);
        MountainsTop.update(deltaTime, firstPlanVx);
    }
}