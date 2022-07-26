import express from  'express';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { getProductById, getProductsByCategory, addProduct,getAdminProducts} from '../controller/product-controller.js';
import { addChallenge, getChallenges, getUserChallenges, UserattemptChallenge,UserChallengeUpdate} from '../controller/challenge-controller.js';
import multer from 'multer';
import storage from "../utils/CloudinaryUtils.js"; 


const router = express.Router();
const upload = multer({ storage });

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.post('/cart/add', addItemInCart);

router.post('/allProduct', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product',addProduct);
router.get('/product/admin/:id',getAdminProducts);

router.post('/challenge/add',addChallenge);
router.get('/challenge/all',getChallenges);
router.post('/challenge/user',getUserChallenges);
router.post('/challenge/attempt',UserattemptChallenge);
router.post('/challenge/update',UserChallengeUpdate);
export default router;