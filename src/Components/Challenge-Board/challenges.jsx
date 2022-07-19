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

import { makeStyles } from '@material-ui/core'

import styles from "./styles/challengeBoardStyle.js";
import './styles/custom.css'
const useStyles = makeStyles(styles);


const Challenges = () => {
    const classes = useStyles();
    return (
        <div className="mr-5">
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        {/* <Icon>content_copy</Icon> */}
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
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        {/* <Store /> */}
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
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                        {/* <Icon>info_outline</Icon> */}
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
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        {/* <Accessibility /> */}
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
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        {/* <Accessibility /> */}
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
            </GridContainer>
        </div>
    );
}

export default Challenges;