import React, { useState } from 'react'
import Profiles from './Profiles';
import { Leaderboard } from '../../assets/leaderboard';

export default function Board() {

    const [period, setPeriod] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    Leaderboard.push(
        {
            name: user.username,
            location: "India",
            score: user.points,
            img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            dt: "2022-01-21",
            badge: 'https://i.postimg.cc/RZ90bhZC/bronze.png'
        }
    );
    const handleClick = (e) => {

        setPeriod(e.target.dataset.id)
    }

    return (
        <div className="board">
            <div className="duration">
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id='30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All-Time</button>
            </div>

            <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>

        </div>
    )
}



function between(data, between) {
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if (a.score === b.score) {
            return b.score - a.score;
        } else {
            return b.score - a.score;
        }
    })

}