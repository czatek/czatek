import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from './message';
import { MessagesService } from './messages.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<Message[]>;
  messageForm: FormGroup;
  @ViewChild(PerfectScrollbarComponent) scroll: PerfectScrollbarComponent;

  constructor(private fb: FormBuilder, private messagesService: MessagesService) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      content: ['', Validators.required]
    });
    this.messages$ = this.messagesService.messages$;
    this.messages$.subscribe(_ => setTimeout(() => this.scroll.directiveRef.scrollToBottom()));
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.messagesService.sendMessage(this.messageForm.value.content);
      this.messageForm.reset();
    }
  }
}
