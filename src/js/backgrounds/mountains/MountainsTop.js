import Renderer from "../../Renderer";
import Ground from "../Ground";

export default class MountainsTop {
  // --- Sprite ---
  /** Moutain image */
  static image = new Image();

  // --- Position ---
  /** Moutain position */
  static x = 0;
  static y = 0;

  static randomNumberX;
  static randomNumberY;

  static async init() {
    await this.loadImage(this.generateRandomImage());
  }

  static loadImage(generateRandomImage) {
    return new Promise((resolve, reject) => {
      this.image.onload = resolve;

      this.image.onerror = () => {
        reject(
          new Error("Unable to load Moutain image: " + generateRandomImage),
        );
      };

      this.image.src = generateRandomImage;

      this.randomNumberX =
        Math.random() * Renderer.canvas.width + Renderer.canvas.width;
      this.randomNumberY = Math.random() * (Ground.y - this.image.height);

      this.x = this.randomNumberX;
      this.y = this.randomNumberY;
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
  const images = Object.values(import.meta.glob(
    "../../../assets/lvl1/haut/*.png",
    { eager: true, query: "?url", import: "default" }
  ));

  return images[Math.floor(Math.random() * images.length)];
}
}
