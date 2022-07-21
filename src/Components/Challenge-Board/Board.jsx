import Challenges from './challenges'
import './styles/custom.css'
import EarnPoints from './earnPoints'
import Badges from './badges'
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';

import Sidebar from './sidebar'

const ChallengeBoard = () => {
    return (
        <div>
            <div className="leaderboard">
                <div className="TitleBar">
                    <h1>Challenge Board</h1>
                    <p>Collect badges and get Rewards</p>
                </div>
                <div className="c_flex">
                    <div className="center_title">
                        <span>Krutika Bhatt</span>
                    </div>
                <button style={{marginRight:'5px'}}>
                    <div className="coins">
                        <span style={{ marginRight: '1px' }}>Coins :</span>
                        <span>456 </span>
                        <img src={coins} width="25" className='reward_icon' />
                    </div>
                </button>
                <button>
                    <div className="coins">
                        <span>Badge :</span>
                        <img src={gold} width="25" className='reward_icon' />
                    </div>
                </button>
                </div>
            </div>
            <div className="app__page">
                <Sidebar />
                <div className="content_page mr-5">
                    <Challenges />
                    <EarnPoints/>
                    <Badges />
                </div>
            </div>
            
        </div>
    );
}

export default ChallengeBoard;