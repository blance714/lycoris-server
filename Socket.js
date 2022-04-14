import EventEmitter from "events";
import { WebSocket } from "ws";
class Socket {
    constructor(ws) {
        this.emitter = new EventEmitter();
        ws.on('message', this.praseMessage.bind(this));
        this.ws = ws;
    }
    praseMessage(data) {
        const json = JSON.parse(data.toString());
        console.log(json);
        this.emitter.emit(json.type, json.data);
    }
    on(eventName, callback) {
        this.emitter.on(eventName, callback.bind(this));
    }
    emit(type, data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: type,
                data: data
            }));
            return true;
        }
        else
            return false;
    }
}
export default Socket;