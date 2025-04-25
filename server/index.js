const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);

    const chatOpenMessage = JSON.stringify({ event: 'chat-open', message: 'Здравия желаю' });

    switch (json.event) {
        case 'chat-message':
            switch (json.payload) {
                case '/help':
                    webSocketServer.clients.forEach((client) =>
                        client.send(
                            JSON.stringify({ event: 'chat-message', message: 'Вспомогательная информация. Пояснение' }),
                        ),
                    );
                    break;
                case '/info':
                    webSocketServer.clients.forEach((client) =>
                        client.send(
                            JSON.stringify({
                                event: 'chat-message',
                                message: 'Добавить какую-то информацию об оплате или типа того',
                            }),
                        ),
                    );
                    break;
                default:
                    webSocketServer.clients.forEach((client) =>
                        client.send(JSON.stringify({ event: 'chat-message', message: 'Неверно задана команда' })),
                    );
                    break;
            }
            webSocketServer.clients.forEach((client) => client.send(json.payload.message));
            break;
        case 'chat-open':
            webSocketServer.clients.forEach((client) => client.send(chatOpenMessage));
            break;
        default:
            ws.send(`${new Error('Wrong query').message} - ${json.event}`);
    }
};

webSocketServer.on('connection', (ws) => {
    ws.on('message', (m) => dispatchEvent(m, ws));
    ws.on('error', (e) => ws.send(e));
});

server.listen(3000, () => console.log('Server started'));
