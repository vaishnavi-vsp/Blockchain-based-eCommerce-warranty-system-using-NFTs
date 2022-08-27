import Challenges from './challenges'
import './styles/custom.css'
import EarnPoints from './earnPoints'
import Badges from './badges'
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';
import axios from 'axios';
import Sidebar from './sidebar'
import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

const ChallengeBoard = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/user/${JSON.parse(localStorage.getItem("user"))._id}`
            );
            setUser(response.data);
           
          } catch (err) {
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
        getData();
    }, []);



    return (
        <div>
            {loading? <>
                <Box sx={{ display: 'flex' }} style={{margin:'40px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                  <CircularProgress />
                </Box>
            </> : <>
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
                        <span>{user.points}</span>
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
            </>}
        </div>
    );
}

export default ChallengeBoard;