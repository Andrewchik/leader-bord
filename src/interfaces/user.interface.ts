import {Color} from "../enum/color.enum";

export interface UserItemProps {
    itemKey: number;
    user: User;
}

export interface User {
    color: Color;
    name: string;
    speed: number;
    time: string;
}
