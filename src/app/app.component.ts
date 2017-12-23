import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpened = true;
  sidebarMode = 'side';

  constructor (public authService: AuthService, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.sidebarOpened = !result.matches;
      this.sidebarMode = result.matches ? 'over' : 'side';
    });
  }
}
