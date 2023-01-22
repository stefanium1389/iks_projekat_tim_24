import { GeoCoordinateDTO } from "./RouteDTO";

export interface VehicleDTO{
    id:number;
    driverId:number;
    vehicleType:string;
    model:string;
    licenseNumber:string;
    location: GeoCoordinateDTO;
    passengerSeats:number;
    babyTransport:boolean;
    petTransport:boolean;
}

export interface VehicleChangeDTO{
    driverId:number;
    vehicleType:string;
    model:string;
    licenseNumber:string;
    passengerSeats:number;
    babyTransport:boolean;
    petTransport:boolean;
}