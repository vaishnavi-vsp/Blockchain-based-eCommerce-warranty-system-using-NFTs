import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Home/NarBar';
import Slide from './Home/Slide';
import React, { useEffect } from 'react';
import SliderHome from "./Slider";
import  FlashDeals from '../Components/Home/subcomponents/flashDeals/FlashDeals'
import TopCategory from '../Components/Home/subcomponents/top/TopCate';
import NewArrivals from '../Components/Home/subcomponents/newarrivals/NewArrivals';
import Discount from '../Components/Home/subcomponents/discount/Discount'; 
import "./Home.css";
import { productData } from '../assets/products'
import Data from '../assets/ProductData';

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {
    const classes = useStyle();
    const  products = productData;
    const { productItems } = Data

    return (
        <>
            <NavBar />
            <Box className={classes.component}>
                
                <SliderHome />
                <Slide
                    data={products}
                    title='Deals of the Day'
                    timer={true}
                    multi={true}
                />
                <FlashDeals productItems={productItems}/>
                <TopCategory />
                <NewArrivals />
                <Discount />
            </Box>
        </>
    )
}

export default Home;