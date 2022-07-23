import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Home/NarBar';
import Slide from './Home/Slide';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import SliderHome from "./Slider";
import  FlashDeals from '../Components/Home/subcomponents/flashDeals/FlashDeals'
import TopCategory from '../Components/Home/subcomponents/top/TopCate';
import NewArrivals from '../Components/Home/subcomponents/newarrivals/NewArrivals';
import Discount from '../Components/Home/subcomponents/discount/Discount'; 
import "./Home.css";
import { getProducts } from '../redux/actions/productActions';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/posts?_limit=10`
            );
            setData(response.data);
          } catch (err) {
            setData(null);
          } finally {
            setLoading(false);
          }
        };
        getData();
      }, []);

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