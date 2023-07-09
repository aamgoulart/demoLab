import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
interface MessageData {
  message: number;
  time?: string;
}
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];
  currentData!: MessageData;
  private socketLento$!: WebSocketSubject<any>;
  valorAtual!: MessageData;

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.webSocketUrl);

      this.socket$.subscribe((data: MessageData) => {
        this.receivedData.push(data);
        console.log(this.receivedData.length)
        // console.log(data)
        this.currentData = data;
      });
    }
  }

  sendMessage(message: string) {
    this.socket$.next({ message });
  }

  close() {
    this.socket$.complete();
  }

  public conectarWsLento(): void {
    if (!this.socketLento$ || this.socketLento$.closed) {
      this.socketLento$ = webSocket("ws://localhost:8000/wsLento");

      this.socketLento$.subscribe((data: MessageData) => {
        this.valorAtual = data;
      });
    }
  }

  iniciarComunicacao(message: string) {
    this.socketLento$.next({ message });
  }

  fecharComunicacao() {
    this.socketLento$.complete();
  }
 
}
