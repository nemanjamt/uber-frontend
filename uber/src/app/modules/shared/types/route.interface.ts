import { RoutePartInterface } from "./routePart.interface";

export interface RouteInterface{
  id:number;
  length:number;
  routeParts:RoutePartInterface[];
}
