
export default class CollisionManager {

    static pixelCache = new WeakMap();

    static getAABB(object) {
        const width = object.displaySize ?? object.image.width;
        const height = object.displaySize ?? object.image.height;

        return {
            x: object.x,
            y: object.y,
            width,
            height
        };
    }

    static checkAABB(objectA, objectB) {
        const a = this.getAABB(objectA);
        const b = this.getAABB(objectB);

        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    static getPotentialCollisions(player, objects) {
        return objects.filter(object =>
            this.checkAABB(player, object)
        );
    }

    static getPixelData(object) {
        const isSpriteSheet = Boolean(object.sprite);

        const image = isSpriteSheet
            ? object.sprite
            : object.image;

        const width = object.displaySize ?? image.width;
        const height = object.displaySize ?? image.height;

        const sx = isSpriteSheet ? object.spriteFrameX : 0;
        const sy = 0;

        const sw = isSpriteSheet
            ? object.spriteFrameSize
            : image.width;

        const sh = isSpriteSheet
            ? object.spriteFrameSize
            : image.height;

        if (!image.complete || image.naturalWidth === 0) {
            return null;
        }

        let cache = this.pixelCache.get(object);
        if (
            !cache ||
            cache.image !== image ||
            cache.sx !== sx ||
            cache.sy !== sy ||
            cache.sw !== sw ||
            cache.sh !== sh ||
            cache.width !== width ||
            cache.height !== height
        ) {


            const canvas = document.createElement("canvas");

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d", {
                willReadFrequently: true
            });

            ctx.imageSmoothingEnabled = false;

            ctx.clearRect(0, 0, width, height);

            ctx.drawImage(
                image,
                sx, sy, sw, sh,
                0, 0, width, height
            );

            cache = {
                image,
                sx,
                sy,
                sw,
                sh,
                width,
                height,
                data: ctx.getImageData(0, 0, width, height).data
            };

            this.pixelCache.set(object, cache);
        }

        return cache.data;
    }



    static checkPixelPerfect(objectA, objectB) {

        const a = this.getAABB(objectA);
        const b = this.getAABB(objectB);

        const left = Math.max(a.x, b.x);
        const right = Math.min(a.x + a.width, b.x + b.width);

        const top = Math.max(a.y, b.y);
        const bottom = Math.min(a.y + a.height, b.y + b.height);

        if (left >= right || top >= bottom) {
            return false;
        }

        const pixelsA = this.getPixelData(objectA);
        const pixelsB = this.getPixelData(objectB);

        if (!pixelsA || !pixelsB) return false;

        const startX = Math.floor(left);
        const endX = Math.ceil(right);

        const startY = Math.floor(top);
        const endY = Math.ceil(bottom);

        for (let y = startY; y < endY; y++) {

            for (let x = startX; x < endX; x++) {

                const worldX = x + 0.5;
                const worldY = y + 0.5;

                const ax = Math.floor(worldX - a.x);
                const ay = Math.floor(worldY - a.y);

                const bx = Math.floor(worldX - b.x);
                const by = Math.floor(worldY - b.y);

                if (
                    ax < 0 || ax >= a.width ||
                    ay < 0 || ay >= a.height ||
                    bx < 0 || bx >= b.width ||
                    by < 0 || by >= b.height
                ) continue;

                const indexA = (ay * a.width + ax) * 4;
                const indexB = (by * b.width + bx) * 4;

                const alphaA = pixelsA[indexA + 3];
                const alphaB = pixelsB[indexB + 3];

                if (alphaA > 20 && alphaB > 20) {
                    return true;
                }
            }
        }

        return false;
    }

    static checkWorldBounds(player) {

        if (player.y + player.displaySize >= player.groundLimitY) {
            player.hitGround();
            return;
        }

        if (player.y <= 0) {
            player.hitCeiling();
        }
    }
}
