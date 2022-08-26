import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: String
    },
    points: {
        type:Number,
        default:0,
    },
    badge:{
        type:String,
        default: 'https://i.postimg.cc/g0mqG4t3/bronze.png'
    },
    challenges:[
        {
            challenge:{
                type:String,
            },
            completed: {
                type: Boolean
            },
            mark:{
                type: Number
            }
        }
    ]
});

const user = mongoose.model('user', userSchema);

export default user;