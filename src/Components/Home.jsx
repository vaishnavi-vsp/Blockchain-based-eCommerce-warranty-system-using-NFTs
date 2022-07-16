import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Home/NarBar';
import Slide from './Home/Slide';
import React, { useEffect } from 'react';
import SliderHome from "./Slider";
import "./Home.css";
import { productData } from '../assets/products'

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {
    const classes = useStyle();
    const  products = productData;

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
                <Slide
                    data={products}
                    title='Discounts for You'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={products}
                    title='Suggested Items'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={products}
                    title='Top Selection'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={products}
                    title='Recommended Items'
                    timer={false}
                    multi={true}
                />
            </Box>
        </>
    )
}

export default Home;