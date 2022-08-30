import Product from '../model/productSchema.js';
import order from '../model/orderSchema.js';
import user from '../model/userSchema.js';
import moment from 'moment'
import bcrypt from "bcrypt";
import 'moment/locale/it.js'

moment.locale('it')


export const addOrder = async(req,res) =>{
    try {
        const order1 =  req.body;
        const product_id = req.body.product_id;
        
        let product = await Product.findOne({ '_id': product_id });

        if(product.hasWarranty){
            const rndInt = Math.floor(Math.random() * product.nfts.length)
            const updated_nfts = [];

            const order_nft = product.nfts[rndInt];

            for(let i=0;i<product.nfts.length;i++){
                if(i!=rndInt){
                    updated_nfts.push(product.nfts[i]);
                }
            }
            console.log("Updated NFT :",updated_nfts);
            const newProduct = await Product.findByIdAndUpdate({_id:product_id},{  nfts:updated_nfts},{new:true});
            const waranty_period = product.warranty_period;

            // Adding hh:mm:ss
            let times = waranty_period.time.split(":");

            var days_period = moment().add({days:waranty_period.days,months:waranty_period.months,years:waranty_period.years,hours:parseInt(times[0]),minutes:parseInt(times[1]),seconds:parseInt(times[2])}).format();;
            console.log("Days Period :",days_period)

            order1.nft_image = order_nft.url;
            order1.hash = order_nft.hash;
            order1.rare = JSON.parse(JSON.stringify(product.nfts[rndInt])).rare;
            order1.warranty_period = days_period;
            order1.owner = await bcrypt.hash( req.body.address, 10);
        }
        else{
            order1.nft_image = null;
            order1.hash = null;
            order1.rare = false;
            order1.waranty_period = null;
            order1.owner = null;
        }
        
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