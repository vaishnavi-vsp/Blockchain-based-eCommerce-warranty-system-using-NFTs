import express from  'express';
import { userSignUp, userLogIn,UserById } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { getProductById, getProductsByCategory, addProduct,getAdminProducts,updateProduct} from '../controller/product-controller.js';
import { addChallenge, getChallenges, getUserChallenges, UserattemptChallenge,UserChallengeUpdate} from '../controller/challenge-controller.js';
import { addOrder, getOrdersOfUser,getOrderbyId } from '../controller/order-controller.js';

import multer from 'multer';
import storage from "../utils/CloudinaryUtils.js"; 


const router = express.Router();
const upload = multer({ storage });

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.post('/cart/add', addItemInCart);
router.get('/user/:id',UserById);

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

router.post('/order/add',addOrder);
router.get('/order/:id',getOrdersOfUser);
router.get('/order/get/:id',getOrderbyId)

export default router;