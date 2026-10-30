export default class Canvas {
    static canvas = document.getElementById("canvas");
    static ctx = this.canvas.getContext("2d");

    static BASE_HEIGHT = 700;

    static scale = 0;
    static largeurLogique = 0;

    static get width() {
        return this.canvas.width;
    }

    static get height() {
        return this.canvas.height;
    }

    /**
     * Permet de redimensionner le canvas
     * @returns {void}
     */
    static resize() {
        const largeurDispo = window.innerWidth * 0.9;
        const hauteurDispo = window.innerHeight * 0.7;

        this.canvas.width = Math.floor(largeurDispo);
        this.canvas.height = Math.floor(hauteurDispo);

        this.scale = this.canvas.height / this.BASE_HEIGHT;
        this.largeurLogique = this.canvas.width / this.scale;
    }
}