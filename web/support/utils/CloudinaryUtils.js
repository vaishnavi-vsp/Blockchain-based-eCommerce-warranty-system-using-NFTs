import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.v2.config({
    cloud_name: 'dvpxnzwnl', 
    api_key: '979121913522986', 
    api_secret: 'mDnftN1htTX5iaPucT544C5X6PY' 
})


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'flipkart',
        allowedFormats: ['jpeg', 'png', 'jpg', 'jfif','pdf']
    }
})

export default storage;

