import { Card, makeStyles, Box, Typography, Button } from '@material-ui/core';
import { format } from 'date-fns'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  component: {
      borderTop: '1px solid #f0f0f0',
      borderRadius: 0,
      display: 'flex',
      margin:80,
      marginBottom: 40,
      justifyContent:'space-evenly',
      alignItems: 'flex-start'
  },
  purchasingHistory: {
    borderTop: '1px solid #f0f0f0',
    borderRadius: 0,
    margin:80,
    marginTop: 0,
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: '20px 50px'
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
    height: 120,
    width: 120,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
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
  blackTextColor: {
    color: '#878787'
  },
  smallText: {
      fontSize: 14,
  },
  purchasingText: {
    fontSize: 15,
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

  },
  warrantyStatus: {
    fontWeight:450,
    color: 'green',
    border: '1px solid green',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#d6dbd6',
    
  },
  warrantyDeatils:{
    borderTop: '1px solid #f0f0f0',
    borderRadius: 0,
    margin:80,
    marginTop: 0,
    display: 'block',
    justifyContent:'center',
    alignItems: 'center',
    padding: '20px 50px'
  },
  pdf_frame: {
    textAlign:'center',
    width: '-webkit-fill-available',
    height: 500,
  }
});

const Warrantydetails = ({match}) => {

  const classes = useStyle();
  const [order,setOrder] = useState();
  const [issue,SetIssue] = useState();
  const [product, SetProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [date,SetDate] = useState();
  const [warrantyPeriod,SetwarrantyPeriod] = useState();
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/order/get/${match.params.id}`
        );
      
        SetDate(format(new Date(response.data.order.ordered_at), 'yyyy/MM/dd kk:mm:ss'));
        SetwarrantyPeriod(format(new Date(response.data.product.warranty_period), 'yyyy/MM/dd kk:mm:ss'))
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
            <Typography style={{textAlign:'center'}} style={{marginTop: '30px'}}>Your NFT </Typography>
            <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{margin: '30px 0', fontFamily:'Monospace',display:'flex',width:320}}>Hash : &nbsp;<div className={classes.hash_value}>{order.nft_image}</div></Typography>
                <img src = {`https://ipfs.infura.io/ipfs/${order.nft_image}`} className={classes.nft_image} alt="" />
            </Box>
        </Card>
        <Card className={classes.purchasingHistory}>
          <div>
            <Typography className={classes.mainTitle} style={{marginBottom:30}}>Purchasing Details</Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Order Number: <span  style={{fontWeight:450,color: '#878787'}}>{order._id}</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Ordered at: <span style={{fontWeight:450,color: '#878787'}}>{date}</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Issuer Name: <span style={{fontWeight:450,color: '#878787'}}>{issue.firstname}  {issue.lastname}</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Issuer EmailID: <span style={{fontWeight:450,color: '#878787'}}>{issue.email}</span></Typography>
          </div>
          <div>
            <Typography className={classes.mainTitle} style={{marginBottom:30}}>Warranty Card</Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Warrant Status: <span className={classes.warrantyStatus}>ACTIVE</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Warranty period: <span style={{fontWeight:450,color: '#878787'}}>{warrantyPeriod}</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Number of transfers: <span style={{fontWeight:450,color: '#878787'}}>{product.transfers}</span></Typography>
            <Typography className={clsx(classes.purchasingText)} style={{margin: '20px 0',fontWeight:600,color:'rgb(56 54 54 / 87%)'}}>Warranty details: <Link to={`${product.warranty_details}`} style={{fontWeight:450,color: 'blue'}}>{product.warranty_details.substring(0, 25)}</Link></Typography>
          </div>
          
        </Card>
        <Card className={classes.warrantyDeatils}>
        <Typography className={classes.mainTitle} style={{marginBottom:30}}>The complete warranty details :</Typography>
          <iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://sss6.sendbig.com/api/Files/download/5368414/02b0a8d3-8d18-5edd-c81f-d5fdad956d12/0" title="warranty details" className={classes.pdf_frame}></iframe>
        </Card>
        </>
    }
     
    </>
  );
}

export default Warrantydetails;