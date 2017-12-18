import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersService } from './users/users.service';
import { MessagesService } from './messages/messages.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent, UsersComponent, MessagesComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    UsersService,
    MessagesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
