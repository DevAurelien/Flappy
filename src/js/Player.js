export default class Player {

    static sprite = new Image();
    static ctx = null;

    static spriteUrl = './src/assets/heros/chevalier_1.png';

    static size = 100;

    static x = 0;
    static y = 0;

    static vx = 0;
    static vy = 0;

    static canvas = null;

    /**
     * Initialise le joueur
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} ctx 
     */
    static init(canvas, ctx) {
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.x = this.canvasWidth / 2 - this.size / 2;
        this.y = this.canvasHeight / 2 - this.size / 2;
        this.ctx = ctx;

        this.sprite.onload = () => {
            console.log('Player charger')
        };

        this.sprite.onerror = () => {
            console.error("Impossible de charger le sprite.");
        };

        this.sprite.src = this.spriteUrl;
    }

    static draw() {
        this.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.size,
            this.size
        );
    }

    static update(gravity) {
        this.vy += gravity;
        this.y += this.vy;


        if(this.y + this.size > this.canvas.height){
            this.vy = 0;
        }
    }

    static jump(){
        this.vy =- 2;
    }


}