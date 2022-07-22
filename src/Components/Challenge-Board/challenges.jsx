import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardFooter from "./components/Card/CardFooter.js";
import PropTypes from 'prop-types'
import * as React from 'react';

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
        <Box sx={{ width: '100%', mr: 1 }}>
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
  
const Challenges = () => {
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="warning" style={{padding:'5px'}}>
                        <img src={task1} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Use 5-10 Daily Deals</p>
                    <h3 className={classes.cardTitle}>
                        200 <small>points</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel value={40} />
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="success" stats icon>
                    <CardIcon color="success" style={{padding:'5px'}}>
                        <img src={task2} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>My 1st Order</p>
                    <h3 className={classes.cardTitle}>200 <small>points</small></h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <LinearProgressWithLabel value={0} />
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="rose" stats icon>
                    <CardIcon color="rose" style={{padding:'5px'}}>
                        <img src={task3} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Active for 60 days</p>
                    <h3 className={classes.cardTitle}>100 <span>points</span></h3>
                    </CardHeader>
                    <CardFooter stats>
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <Button variant="contained" size="small" >Start</Button>
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
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
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <LinearProgressWithLabel value={0} />
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
                    <Box sx={{ width: '100%' }} className="custom_button">
                        <Button variant="contained" size="small" >Start</Button>
                    </Box>
                    </CardFooter>
                </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Challenges;