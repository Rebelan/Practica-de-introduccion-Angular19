const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3002 });

server.on('connection', socket => {
    console.log("Cliente conectado");

    // Enviar mensajes cada 2s
    let counter = 0;
    setInterval(() => {
        counter++;
        socket.send(JSON.stringify({
            type: "notification",
            payload: `Mensaje #${counter} desde el servidor`
        }));
    }, 2000);

    // Recibir mensajes del cliente

    socket.on('message', msg => {
        console.log("📩 Mensaje recibido del cliente:", msg);

        const parsed = JSON.parse(msg);

        // ✅ Reenviar el mensaje al cliente como eco:
        socket.send(JSON.stringify({
            type: "client-message",
            payload: parsed.payload
        }));
    });


    socket.on('close', () => console.log("Cliente desconectado"));
});

console.log("Servidor WebSocket en ws://localhost:3002");
