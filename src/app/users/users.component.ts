import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {
  startWith, debounceTime, distinctUntilChanged, map, combineLatest
} from 'rxjs/operators';

import { User } from './user';
import { UsersService } from './users.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  term = new FormControl();
  selectedChannel = '';

  constructor(private usersService: UsersService, private messagesService: MessagesService) { }

  ngOnInit() {
    const term$ = this.term.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
    );
    this.users$ = this.usersService.users$.pipe(
      combineLatest(term$, (users, term) => this.usersService.searchUsers(users, term)),
    );
  }

  changeChannel(channel: string) {
    this.selectedChannel = channel;
    this.messagesService.changeChannel(channel);
  }
}
