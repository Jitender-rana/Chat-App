import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8090 });

wss.on('connection', function connection(ws) {


  ws.send('pong');
});