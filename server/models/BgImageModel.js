import mongoose from "mongoose";

const bgImageSchema = new mongoose.Schema({
    authorId: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    selected: {
        type: String,
        require: true
    }
}, { timestamps: true });

const BgImageModel = mongoose.model('BgImage', bgImageSchema);
export default BgImageModel;