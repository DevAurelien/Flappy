export default class GameEvent {
    static events = {};

    static on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    static emit(event, data) {
        this.events[event]?.forEach(callback => {
            callback(data);
        });
    }
}
