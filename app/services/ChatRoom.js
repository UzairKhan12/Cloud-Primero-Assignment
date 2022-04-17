const db = require("../../config/Mongoose");
const ChatRoom = db.chatrooms;
const ChatMessages = db.chatmessages;
const User = db.users;
const Helpers = require('../helpers');

exports.createRoom = async (user_ids) => {

    let room = await ChatRoom.findOne({users : { '$all' : user_ids}});

    if (room){

        return room.room_id;
    }

    room = await new ChatRoom({
        users : user_ids,
        room_id : Date.now().toString(36) + Math.random().toString(36).substr(2)
    }).save();

    return room.room_id;

}

exports.getChatMessages = async (room_id) => {

    return await ChatMessages.find({room_id : room_id});
}

exports.createChatMessages = async (params) => {

    params.user = await User.findOne({_id : params.user_id});

    return await new ChatMessages(params).save();

}