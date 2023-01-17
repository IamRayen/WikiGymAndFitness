const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        content: [
            {
                subTitle: {type:String,required:true},
                Photo: String,
                Article: {type:String,required:true},
            },
        ],
        author: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
