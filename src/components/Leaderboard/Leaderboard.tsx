import React, { useState, useEffect, useRef, useCallback } from 'react';

import { UserItem } from './UserItem/UserItem';
import { Color } from "../../enum/color.enum";
import { User } from "../../interfaces/user.interface";

import './Leaderboard.scss';

const Leaderboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const leaderboardRef = useRef<HTMLDivElement>(null);
    const [initialMilliseconds, setInitialMilliseconds] = useState(15000);

    const convertTimeToMilliseconds = useCallback((time: string) => {
        const [minutes, seconds, milliseconds] = time.split(/[:.]/).map(Number);
        return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
    }, []);

    const getRandomWord = useCallback(() => {
        const length = Math.floor(Math.random() * 10) + 1;
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let word = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            word += characters[randomIndex];
        }

        return word;
    }, []);

    const getRandomTime = useCallback(() => {
        const minutes = Math.floor(initialMilliseconds / 60000);
        const seconds = Math.floor((initialMilliseconds % 60000) / 1000);
        const milliseconds = initialMilliseconds % 1000;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(4, '0');

        setInitialMilliseconds((prevMilliseconds) => prevMilliseconds + 500); // Update initialMilliseconds value

        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    }, [initialMilliseconds]);

    const getRandomColor = useCallback(() => {
        const colors = [Color.RED, Color.GREEN, Color.BLUE];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (leaderboardRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = leaderboardRef.current;
                if (scrollTop + clientHeight >= scrollHeight) {
                    setIsLoading(true);
                    setTimeout(() => {
                        const newUsers: User[] = [];
                        const startIndex = users.length;
                        const endIndex = startIndex + 50;
                        for (let i = startIndex; i < endIndex; i++) {
                            const user: User = {
                                color: getRandomColor(),
                                name: getRandomWord(),
                                speed: Math.random() * 100,
                                time: getRandomTime(),
                            };
                            newUsers.push(user);
                        }
                        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
                        setIsLoading(false);
                    }, 2000);
                }
            }
        };

        const currentRef = leaderboardRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [getRandomColor, getRandomTime, getRandomWord, users]);

    useEffect(() => {
        setTimeout(() => {
            const generatedUsers: User[] = [];
            for (let i = 0; i < 50; i++) {
                const user: User = {
                    color: getRandomColor(),
                    name: getRandomWord(),
                    speed: Math.random() * 100,
                    time: getRandomTime(),
                };
                generatedUsers.push(user);
            }
            // Sort by time in descending order
            generatedUsers.sort((a, b) => {
                const timeA = convertTimeToMilliseconds(a.time);
                const timeB = convertTimeToMilliseconds(b.time);
                return timeA - timeB;
            });
            setUsers(generatedUsers);
            setIsLoading(false);
        }, 2000);
    }, [convertTimeToMilliseconds]);

    return (
        <div className="leaderboard" ref={leaderboardRef}>
            <div className="users-container">
                {users.map((user, index) => (
                    <UserItem itemKey={index + 1} key={index} user={user} />
                ))}
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default Leaderboard;
