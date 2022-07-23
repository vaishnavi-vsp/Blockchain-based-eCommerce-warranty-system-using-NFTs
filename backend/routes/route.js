import express from  'express';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { getProductById, getProductsByCategory, addProduct } from '../controller/product-controller.js';
const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.post('/cart/add', addItemInCart);

router.post('/allProduct', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product',addProduct);



export default router;