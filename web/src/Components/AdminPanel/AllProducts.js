import React, { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Box} from '@material-ui/core';
import Grid from '@mui/material/Grid';

export default function AllProducts() {
    const [Data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/product/admin/62dd2b8111c9525364586018`
            );
            
            setData(response.data.data);
          } catch (err) {
            setData(null);
           
          } finally {
            setLoading(false);
          }
        };
        getData();
      }, []);

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '80px' }}><h1>All Listed Products</h1></div>
            <div className="productsDiv" >
            {loading?
                <Box sx={{ display: 'flex' }} style={{margin:'40px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
                </Box>:
                <>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{margin:20}}>
                 {Data.map((item) => 
                 <Grid item xs={2} sm={4} md={4} key={item._id}>
                  <Card sx={{ maxWidth: 345, marginRight: '30px' }}>
                    <CardMedia
                        component="img"
                        height="100"
                        width = "100"
                        image={item.cover}
                        alt="NFT 1"
                        style={{objectFit:'contain'}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.shortTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.longTitle}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="big">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
                
                 )}
                 </Grid>
                </>}
               
            </div></div>


    );
}

