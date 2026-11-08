import groundUrl from "../assets/lvl1/lvl1Sol.png";

export default class Background {
    static spriteGround = new Image();
    static spriteGroundUrl = groundUrl;

    static canvasWidth = 0;
    static canvasHeight = 0;

    static groundX = 0;
    static groundY = 0;

    static vx = 1;

    static async init(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;

        await new Promise((resolve, reject) => {
            this.spriteGround.onload = resolve;

            this.spriteGround.onerror = () => {
                reject(new Error("Impossible de charger le spriteGround : " + this.spriteGroundUrl));
            };

            this.spriteGround.src = this.spriteGroundUrl;
        });

        this.groundY = this.canvasHeight - this.spriteGround.height;
    }

    static draw(ctx) {
        this.drawGround(ctx);
    }

    static drawGround(ctx) {

        ctx.drawImage(
            this.spriteGround,
            this.groundX,
            this.groundY,
            this.spriteGround.width,
            this.spriteGround.height
        );
    }

    static update(deltaTime) {
        const frameScale = deltaTime * 60;

        this.groundX -= this.vx * frameScale;
    }
}