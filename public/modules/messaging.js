export default class MessagingTools {
    constructor(socket) {
        this.socket = socket;
    }

    sendPingMessage() {
        let PingMessage = {};
        PingMessage.type = "ru.mail.park.mechanics.requests.fromUsers.GetPingMessage$Request";
        PingMessage.content = "{}";
        this.socket.send(JSON.stringify(PingMessage));
    }

    sendMyTestMessage() {
        let myTestMessage = {};
        myTestMessage.type = "ru.mail.park.websocket.TestMessage$Request";
        myTestMessage.content = "{}";
        this.socket.send(JSON.stringify(myTestMessage));
    }

    sendJoinGameMsg() {
        let joinGameMessage = {}
        joinGameMessage.type = "ru.mail.park.mechanics.requests.fromUsers.JoinGame$Request";
        joinGameMessage.content = "{}";
        this.socket.send(JSON.stringify(joinGameMessage));
    };

    sendClientSnap(snap) {
        let clientSnapMessage = {};
        clientSnapMessage.type = "ru.mail.park.mechanics.base.ClientSnap";
        clientSnapMessage.content = JSON.stringify(snap);
        this.socket.send(JSON.stringify(clientSnapMessage));
    };

    sendPiratMove(piratMove) {
        let clientPiratMoveMessage = {};
        clientPiratMoveMessage.type = "ru.mail.park.mechanics.requests.fromUsers.PiratMoveRequest";
        clientPiratMoveMessage.content = JSON.stringify(piratMove);
        console.log(JSON.stringify("Эгегей, сервер, подвинь мне пирата"));
        this.socket.send(JSON.stringify(clientPiratMoveMessage));
    }

    sendShipMove(shipMove) {
        let clientShipMoveMessage = {};
        clientShipMoveMessage.type = "ru.mail.park.mechanics.requests.fromUsers.ShipMoveRequest";
        clientShipMoveMessage.content = JSON.stringify(shipMove);
        this.socket.send(JSON.stringify(clientShipMoveMessage));
    }

    sendGetNeighbors(cellID) {
        let clientCellMessage = {};
        clientCellMessage.type = "ru.mail.park.mechanics.requests.fromUsers.GetNeighbors";
        clientCellMessage.content = JSON.stringify(cellID);
        console.log(JSON.stringify(clientCellMessage));
        this.socket.send(JSON.stringify(clientCellMessage));
        console.log('Отправлен запрос на получение смежных клеток...');
    }
}
