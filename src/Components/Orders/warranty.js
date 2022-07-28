import { Card, makeStyles, Box, Typography, Button } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import clsx from 'clsx';


const useStyle = makeStyles({
  component: {
      borderTop: '1px solid #f0f0f0',
      borderRadius: 0,
      display: 'flex',
      margin:80,
      justifyContent:'space-evenly',
  },
  leftComponent: {
      margin: 20, 
      display: 'flex',
      flexDirection: 'column'
  },
  nft_component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nft_image :{
    height: 150,
    width: 150
  },
  image: {
      height: 230,
      width: 230
  },
  mid: {
      margin: 20
  },
  greyTextColor: {
      color: '#878787'
  },
  smallText: {
      fontSize: 14,
  },
  price: {
      fontSize: 18,
      fontWeight: 600
  },
  remove: {
      margin: '0 20',
      fontSize: 16,
      backgroundColor: '#c9184a',
      color: '#fff',
      "&:hover": {
          backgroundColor: "hsla(0,0%,78%,.2)",
          color: "#000",
      },
  },
  mainTitle: {
    margin:'10px 0',
    fontSize: 20,
    fontWeight: 600
  },
  hash_value: {
    width:  'inherit',
    overflowX: 'scroll',
    fontFamily:'Monospace',
    marginBottom: '10px',

  }
});

const Warrantydetails = ({match}) => {

  const classes = useStyle();
  const [order,setOrder] = useState();
  const [issuer,SetIssue] = useState();
  const [product, SetProduct] = useState();
  const [loading, setLoading] = useState(true);
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/order/get/${match.params.id}`
        );
        setOrder(response.data.order);
        SetIssue(response.data.issuer);
        SetProduct(response.data.product);
      } catch (err) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
    {loading ?<>
      <Box sx={{ display: 'flex' }} style={{margin:'40px',alignorders:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
        </Box>
        </>:
        <>
        <Card className={classes.component}>
            <Box className={classes.leftComponent}>
                <img src={product.cover} className={classes.image} alt="" />
            </Box>
            <Box className={classes.mid}>
            <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{margin: '30px 0'}}>Serial Number: <span>{order._id}</span></Typography>
              <Typography className={classes.mainTitle}>{product.shortTitle}</Typography>
                <Typography >{product.longTitle}</Typography>
                <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 10 }}>Seller:RetailNet
                <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="" /></span>
                </Typography>
                <Typography style={{margin: '20px 0'}}>
                    <span className={classes.price}>Price : ₹{product.price}</span>&nbsp;&nbsp;&nbsp;
                    <span className={classes.greyTextColor}><strike>₹{product.mrp}</strike></span><br/>
                    <span style={{ color: '#388E3C' }}>Discount : {product.discount} off</span>
                </Typography>
            </Box>
            <Box className={classes.nft_component}>
            <Typography style={{textAlign:'center'}}>Your NFT </Typography>
            <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{margin: '30px 0', fontFamily:'Monospace',display:'flex',width:320}}>Hash : &nbsp;<div className={classes.hash_value}>{order.nft_image}</div></Typography>
                <img src={product.cover} className={classes.nft_image} alt="" />
            </Box>
        </Card>
        </>
    }
     
    </>
  );
}

export default Warrantydetails;