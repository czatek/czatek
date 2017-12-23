import { Injectable, NgZone } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket;
  private connected = new BehaviorSubject(false);
  readonly connected$ = this.connected.asObservable();

  constructor(private zone: NgZone) { }

  public connect (token: string) {
    if (this.socket != null) {
      return;
    }
    this.socket = io({
      path: '/api/chat',
      query: {
        token
      }
    });

    this.socket.on('connect', _ => this.connected.next(true));
    this.socket.on('disconnect', _ => this.connected.next(false));
    this.socket.on('error', err => console.error(err));
  }

  public send (name: string, data?: any) {
    this.socket.emit(name, data);
  }

  public listen<T>(name: string) {
    return this.connected$.pipe(
      first(c => c),
      switchMap(_ => new Observable<T>(observer => {
        this.socket.on(name, data => this.zone.run(() => observer.next(data)));
      }))
    );
  }
}
