import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const productSchema = new mongoose.Schema({
    cover: String,
    shortTitle: String,
    longTitle: String,
    price: Number,
    mrp:Number,
    discount: String,
    description: String,
    discount: String,
    tagline: String,
    category: String,
    hasWarranty: Boolean,
    warranty_details: String,
    created_by: String,
    seller_name:String,
    nfts: [
        {
            hash:String,
            url: String,
        }
    ],
    warranty_period:{
            years:Number,
            months:Number,
            days:Number,
            time:String,
    },
    soulbound:Boolean,
    transfers:Number,
    challenges: [
        {
        challenge:{
            type:String,
        }}
    ],
    created_at :{
        type:Date,
        default:new Date()
    },
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'product');

const products = mongoose.model('product', productSchema);

export default products;