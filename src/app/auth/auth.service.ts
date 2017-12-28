import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private userId = '';
  private googleAuthReady = false;

  constructor(private ws: WebsocketService) {
    this.ws.listen<string>('userId').subscribe(id => this.setUser(id));
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

    await this.gapiLoaded();
    await new Promise(resolve => gapi.load('auth2', resolve));
    gapi.auth2.init({
      client_id: environment.googleClientId,
      scope: 'profile'
    });
    this.googleAuthReady = true;
  }

  public async login(googleUser: any) {
    this.userId = localStorage.getItem('userId');
    const token = googleUser.getAuthResponse().id_token;
    this.ws.connect(token);
  }

  private setUser(id) {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  private gapiLoaded() {
    return new Promise<any>(resolve => {
      window.onGapiReady = () => {
        delete window.onGapiReady;
        resolve();
      };
      if (window.gapi) {
        window.onGapiReady();
      }
    });
  }
}
