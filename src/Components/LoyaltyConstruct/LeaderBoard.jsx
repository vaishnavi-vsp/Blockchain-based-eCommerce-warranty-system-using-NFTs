import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import '../../App.css';
import './style.css';
import './table.css';
import avatar_movement from '../../assets/avatars/dance.gif';
import Board from './Board';
const LeaderBoard = () => {
    return (
        <>
        <div className='container d_flex'>
            <div className="avatar">
                <h1>Krutika Bhatt</h1>
                <p>Supercoins: 300+</p>        
                <img src={avatar_movement} height="450" className="avatar-img"/>
                
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