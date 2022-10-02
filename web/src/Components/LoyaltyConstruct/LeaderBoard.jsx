import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import '../../App.css';
import './style.css';
import './table.css';
import avatar_movement from '../../assets/avatars/dance.gif';
import Board from './Board';
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';

const LeaderBoard = () => {
  const earned_points = JSON.parse(localStorage.getItem("user")).points;
  return (
    <>
      <h1 className='leaderboard_1'>Leaderboard</h1>
      <div className='container d_flex'>
        <div className="avatar">
          <div className="your-score a_block">
            <h3>Krutika Bhatt</h3>
            <div className="c_flex">
              <button>
                <div className="coins">
                  <span style={{ marginRight: '1px' }}>Coins :</span>
                  <span>{earned_points} </span>
                  <img src={coins} width="35" className='reward_icon' />
                </div>
              </button>
              <button>
                <div className="coins">
                  <span>Badge :</span>
                  <img src="https://i.postimg.cc/g0mqG4t3/bronze.png'" width="35" className='reward_icon' />
                </div>
              </button>
            </div>
          </div>
          <img src={avatar_movement} height="400" className="avatar-img" />
        </div>
        <section className='homeSlide contentWidth'>
          <div className='container'>
            <Board />
          </div>
        </section>

      </div>
    </>
  );
}

export default LeaderBoard;