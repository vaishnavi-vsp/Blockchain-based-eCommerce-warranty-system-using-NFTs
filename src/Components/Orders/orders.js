import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import EmptyOrderList from './EmptyOrder';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';


const useStyle = makeStyles(theme => ({
  component: {
      // marginTop: 55,
      padding: '30px 80px',

      display: 'flex',
      [theme.breakpoints.down('sm')]: {
          padding: '15px 0'
      }
  },
  leftComponent: {
      // width: '67%',
      paddingRight: 15,
      margin: 'auto',
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
  const [cartItems,setcartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/order/62dd2b8111c9525364586018`
        );
        console.log(response.data.data)
        setcartItems(response.data.data);
       
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
              
                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Orders ({cartItems?.length})</Typography>
                    </Box>
                        {   cartItems.map(item => (
                                <CartItem item={item}/>
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