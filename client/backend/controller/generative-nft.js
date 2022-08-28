import Product from '../model/productSchema.js';

export const getProductNFT = async (req,res) =>{
    try {
        const productID = req.body.id;
        
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}