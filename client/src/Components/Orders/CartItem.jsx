import { Card, makeStyles, Box, Typography, Button } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from "react-router-dom";

const useStyle = makeStyles({
    component: {
        borderTop: '1px solid #f0f0f0',
        borderRadius: 0,
        display: 'flex'
    },
    leftComponent: {
        margin: 20, 
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        height: 110,
        width: 110
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
            border: '1px solid black'
        },
    }
});

const CartItem = ({item}) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const order_id = item.order._id;
    return (
        <Card className={classes.component}>
            <Box className={classes.leftComponent}>
                <img src={item.cover} className={classes.image} alt="" />
            </Box>
            <Box className={classes.mid}>
                <Typography>{item.longTitle}</Typography>
                <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 10 }}>Brought on : {}</Typography>
                <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 10 }}>Seller:RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="" /></span>
                </Typography>
                <Typography style={{margin: '20px 0'}}>
                    <span className={classes.price}>₹{item.price}</span>&nbsp;&nbsp;&nbsp;
                    <span className={classes.greyTextColor}><strike>₹{item.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#388E3C' }}>{item.discount} off</span>
                </Typography>
                <Link to={`/warranty/${item.order._id}`}> <Button className={classes.remove} >View Warranty Card</Button></Link>
            </Box>
        </Card>
    )
}

export default CartItem;