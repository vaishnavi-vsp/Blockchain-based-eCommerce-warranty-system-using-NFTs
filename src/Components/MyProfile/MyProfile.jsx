import '../../App.css';
import './myprofile.css';
import '../LoyaltyConstruct/style.css';
import '../LoyaltyConstruct/table.css';
import avatar_movement from '../../assets/avatars/dance.gif';
import coins from '../../assets/icons/coin.webp';
import gold from '../../assets/icons/gold.png';

const MyProfile = () => {
  return (
    <>
      <h1 className='myprofile'>Krutika Bhatt</h1>
      <div className='container box'>
        <div className="c_flex2">
          <button>
            <div className="coins">
              <span style={{ marginRight: 'auto' }}>Coins :</span>
              <span>456 </span>
              <img src={coins} width="35" className='reward_icon' />
            </div>
          </button>
          <button>
            <div className="coins">
              <span>Badge :</span>
              <img src={gold} width="35" className='reward_icon' />
            </div>
          </button>
        </div>
        <div>

        </div>

      </div>
    </>
  );
}

export default MyProfile;