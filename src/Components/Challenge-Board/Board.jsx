import Challenges from './challenges'
import './styles/custom.css'
import { makeStyles } from '@material-ui/core'
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';
import avatar from '../../assets/avatar-icons/avatar1.jpg';
import Avatar from '@mui/material/Avatar';

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
            <Challenges />
        </div>
    );
}

export default ChallengeBoard;