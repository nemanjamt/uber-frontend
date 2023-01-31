import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../types/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  getMessagesBetweenUsers(firstUser:number):Observable<Message[]>{
    return this.http.get<Message[]>("/api/message/findByUser/"+firstUser);
  }
}
