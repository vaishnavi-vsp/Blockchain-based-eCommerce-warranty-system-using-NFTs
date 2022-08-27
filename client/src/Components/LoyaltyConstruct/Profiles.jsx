import React from 'react'
import gold from '../../assets/icons/gold.png';

export default function profiles({ Leaderboard }) {
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data){
    return (

        <>
        <div className="table">
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />
            
                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>    
                                <span>{value.location}</span>
                            </div>                
                        </div>
                        <div className="item score_info">
                            <span>{value.score}</span>
                            <img src={value.badge} width="35" className='reward_icon'/>
                        </div>
                        
                    </div>
                    )
                )
            }
            </div>
        </>

        
    )
}