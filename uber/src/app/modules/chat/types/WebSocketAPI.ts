
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserChatComponent } from '../pages/user-chat/user-chat.component';
import { AppComponent } from 'src/app/app.component';
import { AdminChatComponent } from '../pages/admin-chat/admin-chat.component';
import { Component } from '@angular/core';
import { ChatComponent } from './ChatComponents';

export class WebSocketAPI{

    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string ;
    stompClient: any;
    appComponent!: ChatComponent;
    constructor(appComponent: ChatComponent, topic:string){
        this.appComponent = appComponent;
        this.topic = topic;
    }
    
    _connect() {

        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }

    }

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message:any, topic:string) {

        this.stompClient.send(topic, {}, JSON.stringify(message));
    }

    onMessageReceived(message:any) {

        const parsed = JSON.parse(message.body);

        this.appComponent.handleMessage(parsed.body);
    }
}