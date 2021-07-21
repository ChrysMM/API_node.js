const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'product'
            }
        ]
    },
    {
        collection: "category",
    }
);

module.exports = mongoose.model('category', category);
