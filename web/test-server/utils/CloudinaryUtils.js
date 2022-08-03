import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.v2.config({
    cloud_name: '', 
    api_key: '', 
    api_secret: '' 
})


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'flipkart',
        allowedFormats: ['jpeg', 'png', 'jpg', 'jfif','pdf']
    }
})

export default storage;

