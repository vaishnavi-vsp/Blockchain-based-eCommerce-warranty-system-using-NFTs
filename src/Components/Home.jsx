import { Box, makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './Home/NarBar';
import Slide from './Home/Slide';
import React, { useEffect, useState } from 'react';
import SliderHome from "./Slider";
import  FlashDeals from '../Components/Home/subcomponents/flashDeals/FlashDeals'
import TopCategory from '../Components/Home/subcomponents/top/TopCate';
import NewArrivals from '../Components/Home/subcomponents/newarrivals/NewArrivals';
import Discount from '../Components/Home/subcomponents/discount/Discount'; 
import "./Home.css";
import axios from 'axios';
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

    const [dealsData, setdealsData] = useState(null);
    const [flashData, setflashData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.post(
              `http://localhost:8000/allProduct`,{"category":"DayDeals"}
            );
            const flashresp = await axios.post(`http://localhost:8000/allProduct`,{"category":"FlashDeals"})
            setdealsData(response.data);
            setflashData(flashresp.data);
            console.log(response.data);
            console.log(flashresp.data)
          } catch (err) {
            setdealsData(null);
            setflashData(null);
          } finally {
            setLoading(false);
          }
        };
        getData();
      }, []);

    return (
        <>
        <NavBar />
            <Box className={classes.component}>
                
                <SliderHome />
                {loading?
                <Box sx={{ display: 'flex' }} style={{margin:'40px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
                </Box>:
                <>
                  <Slide
                      data={dealsData}
                      title='Deals of the Day'
                      timer={true}
                      multi={true}
                  />
                  <FlashDeals productItems={flashData}/>
                  <TopCategory />
                  <NewArrivals />
                  <Discount />
                </>
                }
            </Box>
        </>
    )
}

export default Home;