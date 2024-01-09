const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    unit: {
        type: String
    }
});

module.exports = mongoose.model('Item', ItemSchema);