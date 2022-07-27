import Product from '../model/productSchema.js';
import order from '../model/orderSchema.js';


export const addOrder = async(req,res) =>{
    try {
        const order =  req.body;
        const newOrder = new order(order);
        await newOrder.save();
        console.log("Created Order successfully");
        res.send({
            success: true,
            message: "Product Order successfully!",
            newOrder,
        });
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}


export const getOrdersOfUser = async (request, response) => {
    try {
        let send_data = [];
        const orders = await order.find({ 'user_id': request.params.id });
        for(let i=0;i<orders.length;i++){
            let product_id = orders[i].product_id;
            let product = await Product.findOne({ '_id': product_id });
            let data = orders[i]._doc;
            send_data.push({
                ...data,
                ...product
            });
        }
        return res.status(200).json({data:send_data});
        
    }catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}