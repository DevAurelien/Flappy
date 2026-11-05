import GameEvent from "./GameEvent.js";

export default class Player {

    static sprite = new Image();

    static isDead = false;

    static canvasWidth = 0;
    static canvasHeight = 0;

    static spriteUrl = './src/assets/heros/chevalier_1.png';

    static size = 100;

    static x = 0;
    static y = 0;

    static vx = 0;
    static vy = 0;

    static init(width, height) {
        this.vy = 0;
        this.isDead = false

        this.canvasWidth = width;
        this.canvasHeight = height;

        this.sprite.onload = () => {
            console.log("Sprite chargé :", this.sprite);
        };

        this.sprite.onerror = () => {
            console.error("Impossible de charger le sprite :", this.spriteUrl);
        };

        this.sprite.src = this.spriteUrl;

        this.initPosition();
    }

    static initPosition() {
        this.x = this.canvasWidth / 2 - this.size / 2;
        this.y = this.canvasHeight / 2 - this.size / 2;
    }

    static draw(ctx) {
        ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.size,
            this.size
        );
    }

    static update(deltaTime, gravity) {
        const frameScale = deltaTime * 60;
        if (!this.isOnGround) {
            this.vy += gravity * frameScale;
        }

        this.y += this.vy * frameScale;

        if (this.y + this.size >= this.canvasHeight) {
            this.y = this.canvasHeight - this.size;
            this.vy = 0;
            this.die();
        }
    }

    static die() {
        if (this.isDead) return;

        this.isDead = true;

        GameEvent.emit("playerDeath");
    }

    static jump() {
        this.vy = -5;
    }
}