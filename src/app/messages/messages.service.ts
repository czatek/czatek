import { Injectable } from '@angular/core';
import { filter, combineLatest, scan } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from './message';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessagesService {
  private channel = new BehaviorSubject('');
  readonly messages$ = this.ws.listen<Message[]>('messages').pipe(
    scan((result, messages) => result.concat(messages), []),
    combineLatest(this.channel,
      (messages, channel) => messages.filter(
          message => !channel && !message.to
          || message.to === channel && message.from.id === this.authService.getUserId()
          || message.to === this.authService.getUserId() && message.from.id === channel
      )
    ),
  );

  constructor(private ws: WebsocketService, private authService: AuthService) {
    this.ws.connected$.pipe(
      filter(c => c)
    ).subscribe(_ => this.ws.send('getMessages'));
  }

  public changeChannel(channel: string) {
    this.channel.next(channel);
  }

  public sendMessage(content: string) {
    this.ws.send('message', {
      to: this.channel.getValue(),
      content,
    });
  }
}
