
import skyUrl from "../../assets/lvl1/lvl1Ciel.png";

export default class Sky {

    // --- Sprite ---
    /** Sky image */
    static image = new Image();
    static imageUrl = skyUrl;

    // --- Position ---
    /** Sky position */
    static x = 0;
    static y = 0;
    static cloneX = 0;

    // --- Movement ---
    /** Sky movement speed */
    static vx = 1;

    /** Image overlap */
    static imageOverlap = 0.80;

    static async init(width, height) {
        await this.loadImage();

        this.cloneX = this.x + this.image.width - this.imageOverlap;
    }

    static loadImage() {
        return new Promise((resolve, reject) => {
            this.image.onload = resolve;

            this.image.onerror = () => {
                reject(new Error(
                    "Unable to load sky image: " + this.imageUrl
                ));
            };

            this.image.src = this.imageUrl;
        });
    }

    static update(deltaTime) {
        const frameScale = deltaTime * 60;

        this.x -= this.vx * frameScale;
        this.cloneX -= this.vx * frameScale;

        this.updateLoop();
    }

    static updateLoop() {
        const imageWidth = this.image.width;

        if (this.x + imageWidth < 0) {
            this.x = this.cloneX + imageWidth - this.imageOverlap;
        }

        if (this.cloneX + imageWidth < 0) {
            this.cloneX = this.x + imageWidth - this.imageOverlap;
        }
    }

    static draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.cloneX, this.y);
    }
}
