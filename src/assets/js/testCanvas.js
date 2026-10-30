
import spriteUrl from "../sprite.png";

export default function afficherSprite(ctx) {
  const sprite = new Image();

  sprite.onload = () => {
    ctx.drawImage(sprite, 0, 0, 100, 100);
  };

  sprite.onerror = () => {
    console.error("Impossible de charger le sprite.");
  };

  sprite.src = spriteUrl;
}
