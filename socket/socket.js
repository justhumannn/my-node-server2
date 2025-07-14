const sessionMiddleware = require('../session/session.js');
module.exports = function(io) {
    io.on('connection', socket => {
        console.log(`✅ [socket.io] user connected: ${socket.id}`);

        socket.on('chat message', data => {
            io.emit('chat message', data);
        });

        socket.on('disconnect', () => {
            console.log(`❌ [socket.io] user disconnected: ${socket.id}`);
        });
    });
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });
};


