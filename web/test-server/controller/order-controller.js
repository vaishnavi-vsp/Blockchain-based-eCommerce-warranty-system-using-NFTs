import Product from '../model/productSchema.js';
import order from '../model/orderSchema.js';
import user from '../model/userSchema.js';


export const addOrder = async(req,res) =>{
    try {
        const order1 =  req.body;
        const newOrder = new order(order1);
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
                "order":data,
                ...product._doc
            });
        }
        return response.status(200).json({data:send_data});
        
    }catch (error) {
        console.log(error);
        response.status(500).json({message:error.message});
    }
}

export const getOrderbyId = async(req,res) => {
    try {
        var orderId = req.params.id;
        const myorder = await order.findOne({ '_id': orderId });
        const issuer = await user.findOne({'_id':myorder.user_id});
        const product = await Product.findOne({'_id':myorder.product_id});
        
        res.json({
            order:myorder,
            issuer: issuer,
            product: product
        });
    } catch (error) {
        console.log(error);
    }
}