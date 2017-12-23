import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private userId = '';
  private googleAuthReady = false;

  constructor(private ws: WebsocketService) {
    this.ws.connected$.pipe(
      filter(c => c)
    ).subscribe(_ => this.ws.send('getUserId'));
    this.ws.listen<string>('userId').subscribe(id => this.userId = id);
  }

  public isAuthenticated() {
    return !!this.userId;
  }

  public getUserId() {
    return this.userId;
  }

  public async initGoogleAuth() {
    if (this.googleAuthReady) {
      return;
    }

    await new Promise(resolve => gapi.load('auth2', resolve));
    gapi.auth2.init({
      client_id: '977466048676-r6pf13bs4qi689g39arlmf23hbot7loe.apps.googleusercontent.com',
      scope: 'profile'
    });
    this.googleAuthReady = true;
  }

  public async login(googleUser: any) {
    const token = googleUser.getAuthResponse().id_token;
    this.ws.connect(token);
  }
}
