export default class World {
    static deltaTime = 0;
    static lastTime = null;

    static gravity = 0.2;

    static initTime() {
        this.lastTime = null;
        this.deltaTime = 0;
    }

    static update(timestamp) {
        if (this.lastTime === null) {
            this.lastTime = timestamp;
        }

        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
    }
}