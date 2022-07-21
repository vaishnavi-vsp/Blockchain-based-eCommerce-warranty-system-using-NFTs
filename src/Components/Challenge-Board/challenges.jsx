import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardFooter from "./components/Card/CardFooter.js";
import CardBody from "./components/Card/CardBody.js";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
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
                    <p className={classes.cardCategory}>Used Space</p>
                    <h3 className={classes.cardTitle}>
                        49/50 <small>GB</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Get more space
                        </a>
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="success" stats icon>
                    <CardIcon color="success" style={{padding:'5px'}}>
                        <img src={task2} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>$34,245</h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <DateRange />
                        Last 24 Hours
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="rose" stats icon>
                    <CardIcon color="rose" style={{padding:'5px'}}>
                        <img src={task3} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Fixed Issues</p>
                    <h3 className={classes.cardTitle}>75</h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <LocalOffer />
                        Tracked from Github
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info" style={{padding:'5px'}}>
                        <img src={task4} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Followers</p>
                    <h3 className={classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <Update />
                        Just Updated
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="primary" stats icon>
                    <CardIcon color="primary"  style={{padding:'5px'}}>
                        <img src={task5} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Followers</p>
                    <h3 className={classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <Update />
                        Just Updated
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info" style={{padding:'5px'}}>
                        <img src={task6} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Used Space</p>
                    <h3 className={classes.cardTitle}>
                        49/50 <small>GB</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Get more space
                        </a>
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={2} sm={4} md={4}>
                <Card>
                    <CardHeader color="danger" stats icon>
                    <CardIcon color="danger" style={{padding:'5px'}}>
                        <img src={task8} width="70"/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Used Space</p>
                    <h3 className={classes.cardTitle}>
                        49/50 <small>GB</small>
                    </h3>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Get more space
                        </a>
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Challenges;