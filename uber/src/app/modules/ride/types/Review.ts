import { UserData } from "../../user/types/UserData";

export interface Review{
    grade:number,
    comment:string,
    id:number,
    client:UserData
}