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


    static async init(height) {
        await MountainsBottom.init(height);
        await MountainsTop.init();
       
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