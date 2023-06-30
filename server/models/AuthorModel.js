import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: false
    }
}, { timestamps: true });

const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel;