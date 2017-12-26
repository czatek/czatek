import { Injectable } from '@angular/core';
import { filter, combineLatest, scan, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from './message';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessagesService {
  private notificationsAllowed = false;
  private channel = new BehaviorSubject<string>(null);
  private sound = new Audio('assets/message.mp3');
  readonly messages$ = this.ws
    .listen<Message[]>('messages')
    .pipe(
      scan((result, messages) => result.concat(messages), []),
      combineLatest(this.channel, (messages, channel) =>
        messages.filter(
          message =>
            (!channel && !message.to) ||
            (message.to === channel &&
              message.from.id === this.authService.getUserId()) ||
            (message.to === this.authService.getUserId() &&
              message.from.id === channel)
        )
      )
    );

  constructor(private ws: WebsocketService, private authService: AuthService) {
    this.ws.connected$
      .pipe(filter(c => c))
      .subscribe(_ => this.ws.send('getMessages'));
    Notification.requestPermission().then(
      result => (this.notificationsAllowed = result === 'granted')
    );
    this.ws
      .listen<Message[]>('messages')
      .subscribe(
        messages =>
          messages.length === 1 &&
          messages[0].to === this.authService.getUserId() &&
          this.showNotification(messages[0])
      );
  }

  public changeChannel(channel: string) {
    this.channel.next(channel);
  }

  public sendMessage(content: string) {
    this.ws.send('message', {
      to: this.channel.getValue(),
      content
    });
  }

  private showNotification(message: Message) {
    if (this.notificationsAllowed) {
      const n = new Notification(message.from.name, {
        body: message.content,
        icon: 'assets/android-chrome-512x512.png'
      });
      if (window.ipcRenderer != null) {
        n.onclick = _ => window.ipcRenderer.send('notification_click');
      }
      setTimeout(n.close.bind(n), 5000);
      this.sound.play();
    }
  }
}
