import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const challengeSchema = new mongoose.Schema({
    cover: String,
    badge: String,
    Title: String,
    points: Number,
    color: String,
    created_at :{
        type:Date,
        default:new Date()
    },
    status: {
        type:Boolean,
        default: true
    },
    condition: Number
});

autoIncrement.initialize(mongoose.connection);
challengeSchema.plugin(autoIncrement.plugin, 'product');

const Challenges = mongoose.model('challenges',challengeSchema);

export default Challenges;