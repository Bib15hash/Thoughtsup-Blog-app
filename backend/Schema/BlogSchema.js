const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {
        type: String
    },
    likes: [String],
    comments: [{
        userName: String,
        comment: String
    }],
    views: {type: Number, default: 0},
    user: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Blog", BlogSchema);