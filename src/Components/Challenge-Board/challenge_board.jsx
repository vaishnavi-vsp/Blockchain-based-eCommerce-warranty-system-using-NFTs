import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardFooter from "./components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import { makeStyles } from '@material-ui/core'

import styles from "./styles/challengeBoardStyle.js";
const useStyles = makeStyles(styles);


const ChallengeBoard = () => {
    const classes = useStyles();
    return (
        <div>
             <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        content_copy
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
                        info_outline
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

export default ChallengeBoard;