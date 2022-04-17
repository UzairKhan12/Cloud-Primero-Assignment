module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            token: {
                type: String,
                required: true,
            },
            user_id: {
                type: String,
                required: true,
            },
            expiration: {
                type: Number,
                required: true,
            },

        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("accesstoken", schema);
};
