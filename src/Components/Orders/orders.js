import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import { useEffect } from 'react';
import EmptyOrderList from './EmptyOrder';
import axios from 'axios';



const useStyle = makeStyles(theme => ({
  component: {
      // marginTop: 55,
      padding: '30px 135px',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
          padding: '15px 0'
      }
  },
  leftComponent: {
      // width: '67%',
      paddingRight: 15,
      [theme.breakpoints.down('sm')]: {
          marginBottom: 15
      }
  },
  header: {
      padding: '15px 24px',
      background: '#fff'
  },
  bottom: {
      padding: '16px 22px',
      background: '#fff',
      boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
      borderTop: '1px solid #f0f0f0'
  },
  placeOrder: {
      display: 'flex',
      marginLeft: 'auto',
      background: '#fb641b',
      color: '#fff',
      borderRadius: 2,
      width: 250,
      height: 51
  }
}));


const MyOrders = () => {
  const classes = useStyle();
  const [cartItems,setcartItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/allProduct`,{"category":"DayDeals"}
        );
        setcartItems(response.data);
       
      } catch (err) {
        setcartItems(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

    return (
        <>
        {loading ? <>
          <Box sx={{ display: 'flex' }} style={{margin:'40px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
                </Box>:
        </> :<>
        { cartItems.length ? 
            <Grid container className={classes.component}>
                <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Box>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                </Grid>
            </Grid> : <EmptyOrderList />
        }
        </>}
        
        </>

    )
}

export default MyOrders;