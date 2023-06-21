const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    todo: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const ToDo = mongoose.model("todo", schema);
module.exports = ToDo;