import express from  'express';
import { userSignUp, userLogIn,UserById,TransferableUsers } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { uploadFile } from '../controller/ipfs-uploads.js';
import { getProductById, getProductsByCategory, addProduct,getAdminProducts,updateProduct} from '../controller/product-controller.js';
import { addChallenge, getChallenges, getUserChallenges, UserattemptChallenge,UserChallengeUpdate, RedeemPoints} from '../controller/challenge-controller.js';
import { addOrder, getOrdersOfUser,getOrderbyId,TransferWarranty,update_all_orders} from '../controller/order-controller.js';
import auth from '../middleware/auth.js'

import multer from 'multer';
import storage from "../utils/CloudinaryUtils.js"; 


const router = express.Router();
const upload = multer({ storage });

// example to place middleware
// router.post('/signup',auth, userSignUp);

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.post('/cart/add', addItemInCart);
router.get('/user/:id',UserById);
router.get('/user_address',TransferableUsers);

router.post('/allProduct', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product',addProduct);
router.get('/product/admin/:id',getAdminProducts);
router.post('/updateProduct',updateProduct);

router.post('/challenge/add',addChallenge);
router.get('/challenge/all',getChallenges);
router.post('/challenge/user',getUserChallenges);
router.post('/challenge/attempt',UserattemptChallenge);
router.post('/challenge/update',UserChallengeUpdate);
router.post('/redeem',RedeemPoints);

router.post('/order/add',addOrder);
router.get('/order/:id',getOrdersOfUser);
router.get('/order/get/:id',getOrderbyId);
router.post('/transfer',TransferWarranty)
router.post('/update_all_orders',update_all_orders);

// IPFS Uploads
router.post('/ipfs/upload',uploadFile);

export default router;