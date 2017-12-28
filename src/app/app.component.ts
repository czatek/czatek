import { Component, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  static readonly BREAKPOINT = 800;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  oldWidth = 0;

  constructor (public authService: AuthService) {}

  ngAfterViewInit() {
    setTimeout(_ => this.resizeWindow(window.innerWidth));
  }

  public toggleSidebar() {
    this.sidenav.toggle();
  }

  public closeSidenavOnMobile() {
    if (window.innerWidth <= AppComponent.BREAKPOINT) {
      this.sidenav.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.resizeWindow(event.target.innerWidth);
  }

  private resizeWindow(width) {
    if (this.oldWidth !== width) {
      this.oldWidth = width;
      if (width > AppComponent.BREAKPOINT) {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      } else {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
    }
  }
}
