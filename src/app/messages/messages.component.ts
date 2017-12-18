import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messages$ = this.messagesService.messages$;
  }
}
