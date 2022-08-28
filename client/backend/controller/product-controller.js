import Product from '../model/productSchema.js';
import crypto from 'crypto';

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

export const updateProduct = async(req,res) =>{
    try {
        const secret = "ipfs";
        // const mobile = [
        //     {
        //         url:"https://i.postimg.cc/nzWJwNbt/1.png",
        //     },
        //     {
        //         url:"https://i.postimg.cc/kD3d78g1/2.png",
        //     },
        //     {
        //         url: "https://i.postimg.cc/nrQJ8Tp9/3.png",

        //     },
        //     {
        //         url: "https://i.postimg.cc/kMV6Xm5K/4.png",

        //     },
        //     {
        //         url:"https://i.postimg.cc/NGWyKzyV/5.png",
        //     }
        // ];
        // const glass = [
        //     {
        //         url:"https://i.postimg.cc/ryBSBJk1/1.png",
        //     },
        //     {
        //         url:"https://i.postimg.cc/qM2843J9/2.png",
        //     },
        //     {
        //         url: "https://i.postimg.cc/bwTk2f2g/3.png",

        //     },
        //     {
        //         url: "https://i.postimg.cc/7LZ73t3k/4.png",

        //     },
        //     {
        //         url:"https://i.postimg.cc/Vk1X6k55/5.png",
        //     }
        // ];
        // const hair = [
        //     {
        //         url:"https://i.postimg.cc/2ytbxCxR/h1.png",
        //     },
        //     {
        //         url:"https://i.postimg.cc/dtzZkt1G/h10.jpg",
        //     },
        //     {
        //         url: "https://i.postimg.cc/R0m3dswF/h2.png",

        //     },
        //     {
        //         url: "https://i.postimg.cc/W47dHG77/h3.png",

        //     },
        //     {
        //         url:"https://i.postimg.cc/rmFDXDn2/h4.png",
        //     },
        //     {
        //         url:"https://i.postimg.cc/4NKhxhJJ/h5.jpg",
        //     },
        //     {
        //         url:"https://i.postimg.cc/6pn2dJ2g/h7.png",
        //     },
        //     {
        //         url: "https://i.postimg.cc/bYVtPRfC/h8.png"
        //     }
        // ];

    
        const pigeon = [
            {
                url:"https://i.postimg.cc/yxNB89cs/1.png",
            },
            {
                url:"https://i.postimg.cc/tCK0L8SX/2.png",
            },
            {
                url: "https://i.postimg.cc/BvCdPbq6/3.png",

            },
            {
                url: "https://i.postimg.cc/d1HpnfZc/4.png",

            },
            {
                url:"https://i.postimg.cc/P5sc6YJJ/5.png",
            },
            {
                url:"https://i.postimg.cc/CK03KkpX/6.png",
            }
        ];

        for (let i = 0; i < pigeon.length; i++) {
            const hash = crypto.createHash('sha256');
            pigeon[i].hash = hash.update(pigeon[i].url).digest("hex");
        }
        console.log(pigeon)
        const newTask = await Product.findByIdAndUpdate({_id:req.body.id},{  nfts:pigeon},{new:true});
        return res.status(200).json({message: "Updated successfully",updated:newTask});
        // return res.status(200).json({message: "Updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}