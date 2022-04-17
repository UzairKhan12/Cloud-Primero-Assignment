module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true,
                select: false
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.pre('save', async function(next) {

        if (this.password) {

            const bcrypt = require('bcrypt');

            const salt = await bcrypt.genSalt(6);

            this.password = await bcrypt.hash(this.password, salt);

        }

        next();
    });


    return mongoose.model("user", schema);
};
