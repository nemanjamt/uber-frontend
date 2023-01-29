import { RouteInterface } from './route.interface';
import { CoordinatesInterface } from "./coordinates.interface";

export interface VehiclesInfoInterface{
  id:number,
  licencePlate:string,
  vehicleType:string,
  occupied:boolean,
  location:CoordinatesInterface,
  marker:L.Marker,
  route:RouteInterface
}