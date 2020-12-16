import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompatClient, Message, Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { filter, first, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SocketClientState } from './socket-client-state';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy {
  private client: CompatClient;
  private state: BehaviorSubject<SocketClientState>;

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

  static textHandler(message: Message): string {
    return message.body;
  }

  constructor() {

  }

  connect(): Observable<CompatClient> {

    this.client = Stomp.over(function () {
      return new SockJS(environment.ws_url);
    });

    // Add the following if you need automatic reconnect (delay is in milli seconds)
    this.client.reconnect_delay = 5000;

    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);

    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    });

    this.asyncWait();

    return new Observable<CompatClient>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  async asyncWait() {
    const value = await this.waitForOneSecond();
    console.log(value);
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('I promise to return after one second!');
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
  }

  subscribe(destination: string, id: string ): Observable<any> {
    var client = this.client;
    return new Observable<any>(observer => {
      const subscription: StompSubscription = client.subscribe(destination, message => {
          observer.next(SocketClientService.jsonHandler(message));}, {id});
    });
  }

  onMessage(id: string, topic: string, handler = SocketClientService.jsonHandler): Observable<any> {
    return this.connect().pipe(first(), switchMap(inst => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = inst.subscribe(topic, message => {
          observer.next(handler(message));
        }, { id });
        return () => inst.unsubscribe(subscription.id);
      });
    }));
  }

  onPlainMessage(id: string, topic: string): Observable<string> {
    return this.onMessage(id, topic, SocketClientService.textHandler);
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
  }


}
