// import { Injectable } from '@angular/core';
// import { of, Subject} from 'rxjs';
// import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

// export const SIGNALING_WS_ENDPOINT = 'ws://localhost:3000';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignalingService {
//   constructor() {}

//   private socket$!: WebSocketSubject<any>;

//   private messagesSubject = new Subject<any>();
//   public messages$ = this.messagesSubject.asObservable();
//   /**
//    * Creates a new WebSocket subject and send it to the messages subject
//    * @param cfg if true the observable will be retried.
//    */
//   public connect(): { unsubscribe: () => void } {

//     if (!this.socket$ || this.socket$.closed) {
//       this.socket$ = this.getNewWebSocket();

//       if(!this.socket$){
//         alert("Can not connect to signaling server");
//       }

//       this.socket$.subscribe(
//         // Called whenever there is a message from the server
//         msg => {
//           console.log('receiver from ws' , msg);
         
//           this.messagesSubject.next(msg);
//         }
//       );
//     }
//     return { unsubscribe: () => {
//       if (this.socket$) {
//         this.socket$.unsubscribe();
//         }
//       }};
//   }

//   sendMessage(msg: any): void {
//     console.log(`sending message: ${msg.type} data ${msg.data}`);
    
//     this.socket$.next(msg);
//   }

//   /**
//    * Return a custom WebSocket subject which reconnects after failure
//    */
//   private getNewWebSocket(): WebSocketSubject<any> {
//     const url = SIGNALING_WS_ENDPOINT;
//     console.log('getNewWebSocket', url);
//     return webSocket({
//       url: `${SIGNALING_WS_ENDPOINT}`,
//       // url: url,
//       openObserver: {
//         next: () => {
//           console.log('[SignalingService]: connection ok');
//         }
//       },
//       closeObserver: {
//         next: () => {
//           console.log('[SignalingService]: connection closed');
//           // this.socket$ = null;          
//         }
//       }
//     });
//   }
// }
