import '../../App.css';
import './myprofile.css';
import '../LoyaltyConstruct/style.css';
import '../LoyaltyConstruct/table.css';
import Board from '../LoyaltyConstruct/Board';
import avatar_movement from '../../assets/avatars/dance.gif';
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';
import purchase from '../../assets/icons/purchase.png';
import profile from '../../assets/icons/profile.png'
import earn from '../../assets/icons/earn.png'
import redeem from '../../assets/icons/redeem.png'
import refer from '../../assets/icons/refer.png'



const MyProfile = () => {
  return (
    <>
      <h1 className='leaderboard'>My Profile</h1>
      <div className='container d_flex2'>
        <div className="av2">
          <div className="your-score a_block">
            <img width='100' src={profile}></img>
            <h2>Krutika Bhatt</h2>
            <h3>Wallet Address</h3>
            <h4>Test Network</h4>
            <div className="c_flex2">
              <button>
                <div className="coins">
                  <span>Coins :</span>
                  <span>456 </span>
                  <img src={coins} width="35" className='reward_icon' />
                </div>
              </button>
              <button>
                <div className="coins">
                  <span >Badge :</span>
                  <img src={gold} width="35" className='reward_icon' />
                </div>
              </button>
            </div>
          </div>
          <div className='middle'>
            <button className='card'>
              <div className='content'>
                <img src={purchase} width='45' />
                <h2 style={{ marginLeft: '5px', marginTop: '5px' }}>My Purchases</h2>
              </div>
            </button>
            <button className='card'>
              <div className='content'>
                <img src={earn} width='45' />
                <h2 style={{ marginLeft: '5px', marginTop: '5px' }}>Earn and Win!</h2>
              </div>
            </button>
            <button className='card'>
              <div className='content'>
                <img src={redeem} width='45' />
                <h2 style={{ marginLeft: '5px', marginTop: '5px' }}>Redeem your rewards!</h2>
              </div>
            </button>
            <button className='card'>
              <div className='content'>
                <img src={refer} width='45' />
                <h2 style={{ marginLeft: '5px', marginTop: '5px' }}>Refer a friend!</h2>
              </div>
            </button>



          </div>


        </div>
      </div>
    </>
  );
}

export default MyProfile;