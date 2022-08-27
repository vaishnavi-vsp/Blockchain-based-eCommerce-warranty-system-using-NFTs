import { useState, useEffect } from 'react';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { FanDetails } from '../../assets/fan_details';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2'
    },
    container: {
        background: '#FFFFFF',
        // margin: '0 80px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));

const data = {
    created_at: '',
    _id: '',
    cover: '',
    shortTitle: '',
    longTitle: '',
    price: '',
    discount: '',
    description: '',
    tagline: '',
    hasWarranty:'',
    warranty_details:'',
    category:'',
    mrp: ''
}


const DetailView = ({ history, match }) => {
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const [ product, setProduct ] = useState(data);
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();


    const dispatch = useDispatch();
    
    useEffect(() => {
        if(product && match.params.id !== product._id && product._id=='') 
            dispatch(getProductDetails(match.params.id));
    }, [dispatch, product, match, loading]);

   
    const getProductValues = async () => {
        setLoading(true);
        const response = await getProductById(id);
        console.log(response.data);
        setProduct(response.data);
        setLoading(false);
    }
    useEffect(() => {
        getProductValues();
    }, []);

    return (
        <Box className={classes.component}>
            <Box></Box>
            { product && Object.keys(product).length &&
                <Grid container className={classes.container}> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer}>
                        <Typography>{product.longTitle}</Typography>
                        <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{marginTop: 5}}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} alt='' /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price}</span>&nbsp;&nbsp;&nbsp; 
                            <span className={classes.greyTextColor}><strike>₹{product.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#388E3C'}}>{product.discount} off</span>
                        </Typography>
                        <ProductDetail product={product} />
                    </Grid>
                </Grid>
            }   
        </Box>
    )
}


export default DetailView;