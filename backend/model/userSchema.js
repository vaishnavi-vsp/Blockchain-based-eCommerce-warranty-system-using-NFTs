import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
    ],
    referalCode:{
        type:String,
        default: uuidv4().substring(0, 8)
    }

});

const user = mongoose.model('user', userSchema);

export default user;