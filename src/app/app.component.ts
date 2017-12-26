import { Component, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor (public authService: AuthService) {}

  ngAfterViewInit() {
    setTimeout(_ => this.resizeWindow(window.innerWidth));
  }

  public toggleSidebar() {
    this.sidenav.toggle();
  }

  public closeSidenavOnMobile() {
    if (window.innerWidth <= 800) {
      this.sidenav.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.resizeWindow(event.target.innerWidth);
  }

  private resizeWindow(width) {
    if (width > 800) {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    } else {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }
  }
}
