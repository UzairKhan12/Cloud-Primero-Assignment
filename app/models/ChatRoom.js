module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            room_id: {
                type: String,
                required: true
            },
            users: {
                type: Array,
                required: true
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("chatroom", schema);
};
