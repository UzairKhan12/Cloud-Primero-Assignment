module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            room_id: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            user: {
                type: Object,
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

    return mongoose.model("chatmessage", schema);
};
