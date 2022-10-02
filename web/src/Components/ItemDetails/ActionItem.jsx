import { useState, useContext, useReducer, useEffect } from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash } from '@material-ui/icons';
import clsx from 'clsx';
import { LoginContext } from '../../context/ContextProvider';
// import { initialState, reducer } from '../../reducers/reducer';
import { addToCart } from '../../redux/actions/cartActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
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

const ActionItem = ({ product,contract }) => {
    const classes = useStyle();
    const { account } = useContext(LoginContext);
    const [points,setPoints] = useState(0);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    
    const earned_points = JSON.parse(localStorage.getItem("user")).points;
    console.log("This is from the contracts action")
    console.log(contract)
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

    const handleCheckbox = (event) => {
        setChecked(event.target.checked);
    };
    
    const addItemToCart = () => {
        dispatch(addToCart(product._id, quantity));
        window.location.href="/cart";
    }
    const NavtoOrders = () => {
        window.location.href="/myorders";
    }
    const placeOrder = async() => {
       
        handleClose();
        
        let current_user = JSON.parse(localStorage.getItem('user'));
        let address = localStorage.getItem('address')
        const data = {
            "product_id": product._id,
            "sold_by":product.seller_name,
            "user_id" :current_user._id,
            "view_warranty": product.hasWarranty,
            "address":address,
        };
        console.log(product)
        console.log("This is the data")
        console.log(data)
        const points = {
            "id":current_user._id,
            "product_id":product._id,
            "mark":1
        }
        if (checked) {
            data["redeem"] = 300
        }
        else{
            data["redeem"] = 0
        }

        const resp = await axios.post('http://localhost:8000/order/add',data);
        const resp2 = await axios.post('http://localhost:8000/challenge/update',points);
        const rarirty = resp.data['newOrder']['rare'] ? 'Rare':'Common';

        localStorage.setItem("user",JSON.stringify(resp.data['user1']));

        if(product.hasWarranty){
            await contract.createNFT(
                resp.data['newOrder']['nft_image'], // tokenUri
                resp.data['product']['transfers'], // transfers
                resp.data['newOrder']['ordered_at'].split("T")[0]+' '+resp.data['newOrder']['ordered_at'].split("T")[1].substring(0,5) , // issue time
               resp.data['newOrder']['warranty_period'].split("T")[0]+" "+resp.data['newOrder']['ordered_at'].split("T")[1].substring(0,5), // duration
                parseInt(resp.data.newOrder['_id']), // serial no
                "0xa491637217782Ed121B78f333ae16aD94fC4f197",//issuer
                resp.data['product']['soulbound'],
                resp.data['product']['shortTitle'],
                resp.data['product']['description'],
                rarirty 
                ,{value:"00000000000000000"}
            )
           
            const tokenId = await contract.getNFTCount()
            const tokenIdInt = parseInt(tokenId._hex,16) //use this variable
            await axios.post('http://localhost:8000/add/token',{"token":tokenIdInt,"order_id":resp.data['newOrder']["_id"]});   
        }
        handleOpenNotification();
        setPoints(resp2.data.points);
        
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
                {earned_points <200 ?<></>:<>
                    <div style={{marginLeft:'30px',marginBottom:'30px'}}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckbox}/>} label="Redeem 200 Points" />  
                    </FormGroup>
                    </div>
                </>}
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
                    {product.hasWarranty ? <h5>Transaction added to blockchain</h5>:<></>}
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