import { UserRef } from "./UserDTO";

export interface ReviewDTO{
    id:number;
    rating:number;
    comment:string;
    passenger:UserRef;
}

export interface ReviewRequestDTO{
    rating:number;
    comment:string;
}