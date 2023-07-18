import React, { useState } from "react";
import HelmetSVG  from '../../../images/SVGElements/HelmetSVG/HelmetSVG';

import {UserItemProps} from "../../../interfaces/user.interface";

import './UserItem.scss';

export const UserItem: React.FC<UserItemProps> = ({ itemKey, user }) => {
    const { name, speed, time, color } = user;
    const [isActive, setIsActive] = useState(false);

    const handleSelectUser = () => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    return (
        <div className={`leaderboard-container ${isActive ? 'active' : ''}`}>
            <div
                className={`user-item ${isActive ? 'active' : ''}`}
                onClick={handleSelectUser}
            >
                <span id="user-span">{itemKey}</span>
                <div className="avatar">
                    <HelmetSVG fill={color === 1 ? 'red' : color === 2 ? 'blue' : 'green'} />
                </div>
                <div className="user-details">
                    <div className="name">
                        {name.length > 8 ? `${name.slice(0, 8)}...` : name}
                    </div>
                    <div className="statistic">
                        <div className="speed">{time}</div>
                        <div className="time"> | {speed.toFixed(2)} км/год</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
