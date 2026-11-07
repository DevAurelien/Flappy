
import GameEvent from "./GameEvent.js";
import playerUrl from "../assets/heros/normalSprite.png";

export default class Player {

    static sprite = new Image();
    static spriteUrl = playerUrl;
    static spriteFrameSize = 256;
    static spriteFrameX = 0;
    static displaySize = 100;

    static canvasWidth = 0;
    static canvasHeight = 0;

    static x = 0;
    static y = 0;

    static velocityY = 0;
    static gravity = 0;
    static bounceVelocity = 3;

    static groundLimitY = 0;
    static groundMargin = 50;

    static animationTimer = 0;
    static animationFrameDuration = 0.050;
    static animationDirection = 1;
    static isAnimationReversing = false;

    static isDead = false;


    static async init(width, height, groundY) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.groundLimitY = groundY + this.groundMargin;

        this.resetState();

        await this.loadSprite();

        this.initPosition();
    }

    static async loadSprite() {
        if (this.sprite.complete && this.sprite.naturalWidth > 0) {
            return;
        }

        await new Promise((resolve, reject) => {
            this.sprite.onload = resolve;

            this.sprite.onerror = () => {
                reject(new Error(
                    "Impossible de charger le sprite : " + this.spriteUrl
                ));
            };

            this.sprite.src = this.spriteUrl;
        });
    }

    static resetState() {
        this.isDead = false;
        this.velocityY = 0;

        this.spriteFrameX = 0;

        this.animationTimer = 0;
        this.animationDirection = 1;
        this.isAnimationReversing = false;
    }

    static initPosition() {
        this.x = this.canvasWidth / 2 - this.displaySize / 2;
        this.y = this.canvasHeight / 2 - this.displaySize / 2;
    }

    static update(deltaTime, gravity) {
        if (this.isDead) return;

        this.updateAnimation(deltaTime);
        this.updatePhysics(deltaTime, gravity);
        this.updateAnimationDirection();
        this.checkCollisions();
    }

    static updatePhysics(deltaTime, gravity) {
        const frameScale = deltaTime * 60;

        this.velocityY += gravity * frameScale;
        this.y += this.velocityY * frameScale;
    }

    static updateAnimationDirection() {
        if (this.velocityY > 0 && !this.isAnimationReversing) {
            this.isAnimationReversing = true;
            this.animationDirection = -1;
        }
    }

    static checkCollisions() {
        if (this.checkGroundCollision()) return;

        this.checkCeilingCollision();
    }

    static checkGroundCollision() {
        if (this.y + this.displaySize < this.groundLimitY) {
            return false;
        }

        this.y = this.groundLimitY - this.displaySize;
        this.velocityY = 0;

        this.die();

        return true;
    }

    static checkCeilingCollision() {
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = this.bounceVelocity;
        }
    }

    static updateAnimation(deltaTime) {
        if (!this.isAnimationReversing) return;

        this.animationTimer += deltaTime;

        if (this.animationTimer < this.animationFrameDuration) return;

        this.animationTimer = 0;

        this.spriteFrameX += this.spriteFrameSize * this.animationDirection;

        const lastFrameX = this.sprite.width - this.spriteFrameSize;

        if (this.spriteFrameX <= 0 || this.spriteFrameX >= lastFrameX) {
            this.spriteFrameX = Math.max(
                0,
                Math.min(this.spriteFrameX, lastFrameX)
            );

            this.isAnimationReversing = false;
        }
    }

    static resetAnimation() {
        this.spriteFrameX = this.sprite.width - this.spriteFrameSize;
        this.animationDirection = 1;
        this.isAnimationReversing = true;
        this.animationTimer = 0;
    }


    static jump() {
        if (this.isDead) return;

        this.resetAnimation();
        this.velocityY = -5;
    }

    static die() {
        if (this.isDead) return;

        this.isDead = true;

        GameEvent.emit("playerDeath");
    }

    static draw(ctx) {
        ctx.drawImage(
            this.sprite,
            this.spriteFrameX,
            0,
            this.spriteFrameSize,
            this.spriteFrameSize,
            this.x,
            this.y,
            this.displaySize,
            this.displaySize
        );
    }
}
