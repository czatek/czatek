import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.renderButton();
  }

  onSuccess(googleUser) {
    this.authService.login(googleUser);
  }

  onFailure(error) {
    console.error(error);
  }

  async renderButton() {
    await this.authService.initGoogleAuth();
    gapi.signin2.render('sign-in', {
      'width': 200,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess.bind(this),
      'onfailure': this.onFailure.bind(this),
    });
  }
}
