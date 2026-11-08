import GameEvent from "./GameEvent.js";
import playerUrl from  "../assets/heros/normalSprite.png";

export default class Player {

    static sprite = new Image();
    static spriteSize = 256;
    static spritePos = 0;
    static spritesUrl = playerUrl;

    static isDead = false;

    static canvasWidth = 0;
    static canvasHeight = 0;

    static sizeInCanvas = 100;

    static animationTimer = 0;
    static animationFrameDuration = 0.050; // 50 ms entre chaque frame
    static spriteDirection = 1;

    static isFinishingAnimation = false;

    static repulse = 3;

    static x = 0;
    static y = 0;

    static vx = 0;
    static vy = 0;

    static groundY = 0;

    static marginGround = 50;

    static async init(width, height, groundY) {
        this.vy = 0;
        this.isDead = false;

        this.canvasWidth = width;
        this.canvasHeight = height;
        this.groundY = groundY + this.marginGround;

        await new Promise((resolve, reject) => {
            this.sprite.onload = resolve;

            this.sprite.onerror = () => {
                reject(new Error("Impossible de charger le spritesUrl : " + this.spritesUrl));
            };

            this.sprite.src = this.spritesUrl;
        });

        this.initPosition();
    }

    static initPosition() {
        this.x = this.canvasWidth / 2 - this.sizeInCanvas / 2;
        this.y = this.canvasHeight / 2 - this.sizeInCanvas / 2;
    }

    static draw(ctx) {

        ctx.drawImage(
            this.sprite,
            this.spritePos, //sx
            0, //sy
            this.spriteSize, //sw
            this.spriteSize, //sh
            this.x, //dx
            this.y, //dy
            this.sizeInCanvas, //dw
            this.sizeInCanvas //dw
        );
    }

    static update(deltaTime, gravity) {
        if (this.isDead) return;

        const frameScale = deltaTime * 60;

        this.animationTimer += deltaTime;

        if (this.isFinishingAnimation) {
            if (this.animationTimer >= this.animationFrameDuration) {
                this.animationTimer = 0;

                this.spritePos += this.spriteSize * this.spriteDirection;

                if (
                    this.spritePos <= 0 ||
                    this.spritePos >= this.sprite.width - this.spriteSize
                ) {
                    this.spritePos = Math.max(
                        0,
                        Math.min(this.spritePos, this.sprite.width - this.spriteSize)
                    );

                    this.isFinishingAnimation = false;
                }
            }
        }

        this.vy += gravity * frameScale;
        this.y += this.vy * frameScale;

        if (this.vy > 0 && !this.isFinishingAnimation) {
            this.isFinishingAnimation = true;
            this.spriteDirection = -1;
        }

        if (this.y + this.sizeInCanvas >= this.groundY) {
            this.y = this.groundY - this.sizeInCanvas;
            this.vy = 0;
            this.die();
        }

        if (this.y < 0) {
            this.y = 0;
            this.vy = this.repulse;
        }
    }


    static die() {
        if (this.isDead) return;

        this.isDead = true;
        GameEvent.emit("playerDeath");
    }

    static jump() {
        if (this.isDead) return;

        this.spritePos = this.sprite.width - this.spriteSize;
        this.isFinishingAnimation = true;
        this.spriteDirection = 1;

        this.animationTimer = 0;
        this.vy = -5;
    }
}