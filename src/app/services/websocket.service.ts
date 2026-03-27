import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface SocketMessage{
  type: string;
  payload: any;
}

@Injectable({providedIn: 'root'})
export class WebsocketService {

  private socket$?: WebSocketSubject<SocketMessage>;

  //Crear conexión WebSocket
  connect(): WebSocketSubject<SocketMessage>{
    if(!this.socket$ || this.socket$.closed){

      this.socket$ = webSocket<SocketMessage>({
        url: 'ws://localhost:3002',

        //Parsear JSON automáticamente
        deserializer: (msg: MessageEvent) => JSON.parse(msg.data),
        serializer: (msg) => JSON.stringify(msg)
      });

      console.log('WebSocket conectado');
    }

    return this.socket$;
  }

  //enviar mensaje
  send(msg: SocketMessage){
    this.socket$?.next(msg);
  }

  //Observable de mensajes
  messages$(): Observable<SocketMessage>{
    return this.socket$ as Observable<SocketMessage>;
  }

  //Cerrar conexión correctametne
  close(){
    this.socket$?.complete();
    console.log("Conexión WebSocket cerrada");
  }
}
