import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    authorId: {
        type: String,
        require: true
    },
    base64: {
        type: String,
        require: true
    }
}, { timestamps: true });

const ImageModel = mongoose.model('Image', imageSchema);
export default ImageModel;