import Product from '../model/productSchema.js';


export const getProductsByCategory = async (request, response) => {
    try {
        const category = request.body.category;
        const products = await Product.find({ 'category': category });
        response.json(products);
    }catch (error) {
        console.log(error);
        response.send("Some Error occured")
    }
}

export const addProduct = async(req,res) =>{
    try {
        console.log(req.body);
        const product =  req.body;
        const newProduct = new Product(product);
        await newProduct.save();
        console.log("Created Product successfully");
        res.send({
            success: true,
            message: "Product added successfully!",
            newProduct,
        });
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const getProductById = async (request, response) => {
    try {
        const products = await Product.findOne({ '_id': request.params.id });
        response.json(products);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const getAdminProducts = async(req,res) => {
    try {
        const products = await Product.find({'created_by': req.params.id });
        res.json({data:products});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
