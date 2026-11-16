
import groundUrl from "../../assets/lvl1/lvl1Sol.png";

export default class Ground {

    // --- Sprite ---
    /** Ground image */
    static image = new Image();
    static imageUrl = groundUrl;

    // --- Position ---
    /** Ground position */
    static x = 0;
    static y = 0;
    static cloneX = 0;

    /** Image overlap */
    static imageOverlap = 0.80;

    static async init(height) {
        await this.loadImage();

        this.y = height - this.image.height;
        this.cloneX = this.x + this.image.width - this.imageOverlap;
    }

    static loadImage() {
        return new Promise((resolve, reject) => {
            this.image.onload = resolve;

            this.image.onerror = () => {
                reject(new Error(
                    "Unable to load ground image: " + this.imageUrl
                ));
            };

            this.image.src = this.imageUrl;
        });
    }

    static update(deltaTime, firstPlanVx) {
        const frameScale = deltaTime * 60;

        this.x -= firstPlanVx * frameScale;
        this.cloneX -= firstPlanVx * frameScale;

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

    static drawAABBbox(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.rect(this.x, this.y, this.image.width, this.image.height);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.rect(this.cloneX, this.y, this.image.width, this.image.height);
        ctx.fill();
    }

}
