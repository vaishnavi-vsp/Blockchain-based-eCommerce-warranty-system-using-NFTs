import { useState, useContext, useReducer, useEffect } from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash } from '@material-ui/icons';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
// import { initialState, reducer } from '../../reducers/reducer';
import { addToCart } from '../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import './style.css';
import axios from 'axios'
import won from '../../assets/icons/won.gif'


const useStyle = makeStyles(theme => ({
    leftContainer: {
        minWidth: '40%',
        // textAlign: 'center',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px'
        }
    },
    productImage: {
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '95%'
    },
    button: {
        width: '46%',
        borderRadius: 2,
        height: 50
    },
    addToCart: {
        background: '#ff9f00',
        color: '#FFF'
    },
    buyNow:{
        background: '#fb641b',
        color: '#FFF'
    }
}));

const ActionItem = ({ product }) => {
    const classes = useStyle();
    const history = useHistory();
    const { account } = useContext(LoginContext);
    const [points,setPoints] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openNot, setOpenNot] = useState(false);
    const handleOpenNotification = () => {
        setOpenNot(true);
    };
    const handleCloseNotification = () => {
        setOpenNot(false);
    };
        
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const buyNow = async () => {
       handleOpen();
       
    }

    const addItemToCart = () => {
        dispatch(addToCart(product._id, quantity));
        history.push('/cart');
    }
    const NavtoOrders = () => {
        window.location.href="/myorders";
    }
    const placeOrder = async() => {
        handleClose();
        handleOpenNotification();
  
        let current_user = JSON.parse(localStorage.getItem('user'));
        const data = {
            "product_id": product._id,
            "sold_by":product.created_by,
            "user_id" :current_user._id,
            "view_warranty": true,
            "nft_image":product.default_nft,
        };
        const points = {
            "id":current_user._id,
            "product_id":product._id,
            "mark":1
        }
        const resp = await axios.post('http://localhost:8000/order/add',data);
        const resp2 = await axios.post('http://localhost:8000/challenge/update',points);
        setPoints(resp2.data.points);
        console.log(resp,resp2);
        
    }

    return (
        <div>
             <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
               <div className="container_modal" >
               <div className="confirmation-text">
                    Do you confirm the order ?
                    </div>
                    <div className="button-container">
                    <button 
                        className="cancel-button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button 
                        className="confirmation-button" onClick={placeOrder}>
                        Confirm
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openNot}
                onClose={handleCloseNotification}
            >
               <div className="earned_points" onClick={NavtoOrders}>
                    <h3>You earned Points!</h3>
                <img src={won} width='250'/>
                </div>
            </Modal>

        <Box className={classes.leftContainer}>
            <img src={product.cover} className={classes.productImage} alt="" /><br />
            <Button onClick={() => addItemToCart()} className={clsx(classes.button, classes.addToCart)} style={{marginRight: 10}} variant="contained"><Cart />Add to Cart</Button>
            <Button onClick={() => buyNow()} className={clsx(classes.button, classes.buyNow)} variant="contained"><Flash /> Buy Now</Button>
        </Box>
        </div>
    )
}

export default ActionItem;