export interface RouteDTO{
    departure:GeoCoordinateDTO;
    destination:GeoCoordinateDTO;
}
export interface GeoCoordinateDTO{
    address:string;
    latitude:number;
    longitude:number;
}