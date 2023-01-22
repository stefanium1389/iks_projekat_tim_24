import { RouteDTO } from "./RouteDTO";
import { UserDTO, UserRef } from "./UserDTO";

export interface FavoriteRideDTO{
    favoriteName:string;
    locations: RouteDTO[];
    passengers: UserRef[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
}
export interface FavoriteRideResponseDTO{
    id:number;
    favoriteName:string;
    locations: RouteDTO[];
    passengers: UserDTO[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
}