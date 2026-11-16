
import mountainUrl from "../../assets/lvl1/bas/montagne_bas_01.png";
import Background from "../Background";

export default class Moutain {

    // --- Sprite ---
    /** Moutain image */
    static image = new Image();
    static imageMoutain = mountainUrl;

    // --- Position ---
    /** Moutain position */
    static x = 0;
    static y = 0;

    static imageOverlap = 35;

    static async init(height) {
        await this.loadImage();
        this.y = height - this.image.height + this.imageOverlap;
    }

    static loadImage() {
        return new Promise((resolve, reject) => {
            this.image.onload = resolve;

            this.image.onerror = () => {
                reject(new Error(
                    "Unable to load Moutain image: " + this.imageMoutain
                ));
            };

            this.image.src = this.imageMoutain;

            this.x = 1500;

        });
    }

    static update(deltaTime, firstPlanVx) {
        const frameScale = deltaTime * 60;

        this.x -= firstPlanVx * frameScale;

        this.updateLoop();
    }

    static updateLoop() {

    }

    static draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);

    }

    static drawAABBbox(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.rect(this.x, this.y, this.image.width, this.image.height);
        ctx.fill();
    }
}
