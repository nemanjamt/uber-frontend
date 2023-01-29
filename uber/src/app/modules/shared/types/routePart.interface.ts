import { MarkerInterface } from './marker.interface';
export interface RoutePartInterface{
  id:number,
  start:MarkerInterface;
  end:MarkerInterface
  index:number
}
