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

const ActionItem = ({ product,contract }) => {
    const classes = useStyle();
    const history = useHistory();
    const { account } = useContext(LoginContext);
    const [points,setPoints] = useState(0);
    const [open, setOpen] = useState(false);
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
        // string memory _tokenURI, uint256 _price,string memory _issueTime ,uint256 _duration,uint256 _serialNo,address _issuer
        // contract.createNFT("1",11,"1222",10,1,"0xa491637217782Ed121B78f333ae16aD94fC4f197",{value:"10000000000000000"})
        let current_user = JSON.parse(localStorage.getItem('user'));
        let address = localStorage.getItem('address')
        const data = {
            "product_id": product._id,
            "sold_by":product.seller_name,
            "user_id" :current_user._id,
            "view_warranty": product.hasWarranty,
            "address":address
        };
        console.log(product)
        console.log("This is the data")
        console.log(data)
        const points = {
            "id":current_user._id,
            "product_id":product._id,
            "mark":1
        }
        
        const resp = await axios.post('http://localhost:8000/order/add',data);
        const resp2 = await axios.post('http://localhost:8000/challenge/update',points);
        if(product.hasWarranty){
            console.log("This product has warranty")
            console.log(resp.data)
            console.log(resp.data['newOrder']['ordered_at'])
            console.log(resp.data['product']['description'])
            contract.createNFT(
                resp.data['newOrder']['nft_image'], // tokenUri
                resp.data['product']['transfers'], // transfers
                resp.data['newOrder']['ordered_at'].split("T")[0]+' '+resp.data['newOrder']['ordered_at'].split("T")[1], // issue time
               resp.data['newOrder']['warranty_period'].split("T")[0]+" "+resp.data['newOrder']['ordered_at'].split("T")[1], // duration
                parseInt(resp.data.newOrder['_id']), // serial no
                "0xa491637217782Ed121B78f333ae16aD94fC4f197",//issuer
                resp.data['product']['soulbound'],
                resp.data['product']['shortTitle'],
                resp.data['product']['description'] 
                ,{value:"00000000000000000"}
            )
            // string memory _tokenURI, uint256 _price,string memory _issueTime ,uint256 _duration,uint256 _serialNo,address _issuer
           
        
            // You can use the response generated from order add
            // JSON object -> resp.data.newOrder
            // resp.data.newOrder = 
            //     {
            //         "ordered_at": "2022-08-30T11:02:36.000Z", (track)
            //         "warranty_period": "2023-08-30T11:06:17.000Z",(track)
            //         "rare": false,
            //         "status": "ACTIVE",
            //         "_id": "630def2982a61b11606e487f",
            //         "product_id": "9",
            //         "sold_by": "62dd2b8111c9525364586018",
            //         "user_id": "62d182d74c0e810ba0a71ed6",
            //         "view_warranty": true,
            //         "nft_image": "https://i.postimg.cc/NGWyKzyV/5.png",
            //         "hash": "94b623503a13ff98c09040e63555a0d16f32fec609db86d232d9d7f22a99e581",
            //         "owner": "$2b$10$lFl2GaoQIxYY.czSkBBtReFFfzaps6EDmmpetvW.Hz0pO0Ma5vzti",
            //         "__v": 0
            //     }
            
            const saving_nft = {
                "owner_wallet_address" : address,
                "nft_image" : resp.data.newOrder.nft_image,
                "warranty_period" :resp.data.newOrder.warranty_period,
                "product_id" : product._id,
                "is_soulbound" :resp.data.product.soulbound,
                "number_of_transfers" :resp.data.product.transfers
            }  // Hopefully these are all the required fields

            console.log(saving_nft);
            
        }
        setPoints(resp2.data.points);
        
        // Kamal's function - Save NFT metadata to blockchain
        // We only save to blockchain If the product has warranty
      
        
        
        
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