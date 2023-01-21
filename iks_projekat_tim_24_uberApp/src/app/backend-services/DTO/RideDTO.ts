import { UntypedFormBuilder } from "@angular/forms";
import { RejectionDTO } from "./RejectionDTO";
import { RouteDTO } from "./RouteDTO";
import { UserRef } from "./UserDTO";

export interface RideDTO{
    id:number;
    startTime:string;
    endTime:string;
    driver:UserRef;
    passengers:UserRef[];
    estimatedTimeInMinutes:number;
    vehicleType:string;
    babyTransport:boolean;
    petTransport:boolean;
    rejection:RejectionDTO | null;
    locations:RouteDTO[];
    status:string;
    totalCost:number;
}

export interface RideRequestDTO{
    locations:RouteDTO[];
    passengers:UserRef[];
    vehicleType:string;
    babyTransport:boolean;
    petTransport:boolean;
    scheduledTime:string;
}
