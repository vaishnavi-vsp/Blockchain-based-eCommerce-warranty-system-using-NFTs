import badge1 from '../../assets/icons/badge1.PNG';
import badge2 from '../../assets/icons/badge2.PNG';
import badge3 from '../../assets/icons/badge3.PNG';
import badge4 from '../../assets/icons/badge4.PNG';
import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";

import './styles/custom.css'


const Badges = () => {
    return (
        <>
        <h2 style={{marginBottom:'1.5em'}}>My Badges</h2>
        <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
                <div>
                    <img src={badge1} height="120" className="badges"/>
                </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <div>
                    <img src={badge2} width="120"  height="120" className="badges"/>
                </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <div>
                    <img src={badge3} width="120"  height="120" className="badges"/>
                </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <div>
                    <img src={badge4} width="120"  height="120" className="badges"/>
                </div>
            </GridItem>
        </GridContainer>
        </>
    );
}

export default Badges;