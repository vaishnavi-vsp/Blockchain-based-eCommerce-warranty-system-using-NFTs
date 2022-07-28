import mongoose from "mongoose"

export const OrderSchema=mongoose.Schema({
    product_id: String,
    sold_by:String,
    user_id :String,
    view_warranty: Boolean,
    nft_image:String,
    ordered_at: {
        type:Date,
        default:new Date()
    }
})

const order=mongoose.model("order",OrderSchema);

export default order;