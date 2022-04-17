module.exports = server => {

    const io = require("socket.io")(server, {
        allowEIO3: true,
        transports: ['websocket'],
        upgrade: false
    });

    io.use(async (socket, next) => {

        if (socket.handshake.query && socket.handshake.query.token) {

            try {

                const AccessToken = require("../services/AccessToken");

                let user_id = await AccessToken.validateAccessToken(socket.handshake.query.token);

                if (!user_id) {

                    next(new Error('Invalid Access token'));
                }

                socket.user_id = user_id;

                next();

            } catch (e) {

                next(new Error(e));
            }
        } else {

            next(new Error('Authentication error'));
        }
    }).on('connection', (socket) => {

        const ChatRoom = require("../services/ChatRoom");

        socket.on("startChat", async (data) => {

            let room_id = await ChatRoom.createRoom([data.user_id, socket.user_id]);

            let messages = await ChatRoom.getChatMessages(room_id);

            socket.leave(socket.current_room);

            socket.join(room_id);

            socket.current_room = room_id;

            io.sockets.in(socket.current_room).emit('loadMessages', {id: socket.id, room_id: room_id, messages: messages});

        });

        socket.on("sendMessage", async (data) => {

            let msg = await ChatRoom.createChatMessages({room_id : socket.current_room, message : data.msg, user_id : socket.user_id})

            io.sockets.in(socket.current_room).emit('message', msg);
        });

    })


}