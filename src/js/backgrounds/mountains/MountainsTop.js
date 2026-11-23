export default class MountainsTop {
    // --- Sprite ---
    /** Moutain image */
    static image = new Image();

    // --- Position ---
    /** Moutain position */
    static x = 0;
    static y = 0;

    static randomNumber;

    static async init(randomNumber) {
        this.randomNumber = randomNumber;
        await this.loadImage(this.generateRandomImage());
        this.x = this.randomNumber;
    }

    static loadImage(generateRandomImage) {
        return new Promise((resolve, reject) => {
            this.image.onload = resolve;

            this.image.onerror = () => {
                reject(new Error(
                    "Unable to load Moutain image: " + generateRandomImage
                ));
            };

            this.image.src = generateRandomImage;

            this.x = this.randomNumber;
        });
    }

    static update(deltaTime, firstPlanVx) {
        const frameScale = deltaTime * 60;

        this.x -= firstPlanVx * frameScale;

        this.updateLoop();
    }

    static async updateLoop() {
        if (this.x + this.image.width < 0) {
            await this.loadImage(this.generateRandomImage());
            this.y = 10;
        }
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

    static generateRandomImage() {
        const randomNumber = Math.floor(Math.random() * 10 + 1);

        return `/Flappy/src/assets/lvl1/haut/montagne_haut_${randomNumber < 10 ? "0" + randomNumber : randomNumber}.png`;
    }
}