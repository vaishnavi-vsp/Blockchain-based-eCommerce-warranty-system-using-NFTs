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
    created_at :{
        type:Date,
        default:new Date()
    },
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'product');

const products = mongoose.model('product', productSchema);

export default products;