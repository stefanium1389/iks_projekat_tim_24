import { UserRef } from "./UserDTO";

export interface ReviewDTO{
    id:number;
    rating:number;
    comment:string;
    passenger:UserRef;
}

export interface ReviewDTOPlus{
    id:number;
    rating:number;
    comment:string;
    passenger:UserRef;
    picture: string;
}

export interface ReviewRequestDTO{
    rating:number;
    comment:string;
}