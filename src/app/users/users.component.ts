import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {
  startWith, debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  term = new FormControl();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.term.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.usersService.searchUsers(term)),
    );
  }
}
