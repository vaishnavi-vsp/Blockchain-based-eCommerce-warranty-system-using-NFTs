import mongoose from "mongoose"
import moment from 'moment'
import 'moment/locale/it.js'

moment.locale('it')
export const OrderSchema=mongoose.Schema({
    product_id: String,
    sold_by:String,
    user_id :String,
    view_warranty: Boolean,
    nft_image:String,
    hash:String,
    owner:String,
    ordered_at: {
        type:Date,
        default:moment().utcOffset("+05:30").format()
    },
    warranty_period:{
        type:Date,
        default:new Date('2022-09-31T10:20:49.380+00:00')
    },
    rare: {
        type: Boolean,
        default:false,
    },
    status: {
        type: String,
        default: "ACTIVE"
    }
})

const order=mongoose.model("order",OrderSchema);

export default order;