import { UserRef } from "./UserDTO";

export interface DriverChangeDTO {
    id : number,
    name : string;
    surname : string;
    profilePicture : string;
    telephoneNumber : string;
    email : string;
    address : string;
    state : string;
    found : boolean;
   
}

