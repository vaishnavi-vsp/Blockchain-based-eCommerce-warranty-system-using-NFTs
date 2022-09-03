import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardFooter from "./components/Card/CardFooter.js";
import PropTypes from 'prop-types'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @material-ui/icons
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import task1 from "../../assets/icons/task1.png"
import task2 from '../../assets/icons/task2.png'
import task3 from '../../assets/icons/task3.png'
import task4 from '../../assets/icons/task4.png'
import task5 from '../../assets/icons/task5.png'
import task6 from '../../assets/icons/task9.png'
import task8 from '../../assets/icons/task8.png'
import { makeStyles } from '@material-ui/core'

import styles from "./styles/challengeBoardStyle.js";
import './styles/custom.css'
const useStyles = makeStyles(styles);


function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '80%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}


LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const attempt = async(challenge_id) =>{
    const currentuser = JSON.parse(localStorage.getItem("user"))
    const resp = await axios.post('http://localhost:8000/challenge/attempt',{id:currentuser._id,challenge_id:challenge_id});
    window.location.reload()
}
  
const Challenges = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const currentuser = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(
              `http://localhost:8000/challenge/user`,{"id":currentuser._id}
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
            {loading?<>
            <Box sx={{ display: 'flex' }} style={{margin:'40px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
                </Box>
            </>:<>
            <GridContainer>
                {data.map((item) =>
                    <GridItem xs={2} sm={4} md={4}>
                    <Card>
                        <CardHeader color={item.color} stats icon>
                        <CardIcon color={item.color} style={{padding:'5px'}}>
                            <img src={item.cover} width="70"/>
                        </CardIcon>
                        <p className={classes.cardCategory}>{item.Title}</p>
                        <h3 className={classes.cardTitle}>
                            {item.points} <small>points</small>
                        </h3>
                        </CardHeader>
                        <CardFooter stats>
                        <Box sx={{ width: '100%' }}>
                            {item.started ? <>
                                <LinearProgressWithLabel value={item.progress} />
                            </>:<>
                                <Button variant="contained" size="small" onClick={() => attempt(item._id)}>Start</Button>
                            </>}
                            
                        </Box>
                        </CardFooter>
                    </Card>
                    </GridItem>
                )}
                
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info" style={{padding:'5px'}}>
                        <img src={task4} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Send 3 gifts</p>
                    <h3 className={classes.cardTitle}>600 <span>points</span></h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <LinearProgressWithLabel value={10} />
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="primary" stats icon>
                    <CardIcon color="primary"  style={{padding:'5px'}}>
                        <img src={task5} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Referral 7 friends</p>
                    <h3 className={classes.cardTitle}>+100 <small>points</small></h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <LinearProgressWithLabel value={80} />
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info" style={{padding:'5px'}}>
                        <img src={task6} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Redeem upto $1000</p>
                    <h3 className={classes.cardTitle}>
                        440 <small>points</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box className="custom_button">
                        <Button variant="contained" size="small" >Start</Button>
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="danger" stats icon>
                    <CardIcon color="danger" style={{padding:'5px'}}>
                        <img src={task8} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Get 2 NFT warranties</p>
                    <h3 className={classes.cardTitle}>
                        500 <small>points</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box  className="custom_button">
                        <Button variant="contained" size="small" >Start</Button>
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
            </GridContainer>
            </>}
            
        </div>
    );
}

export default Challenges;