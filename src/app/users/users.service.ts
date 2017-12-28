import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators';
import { User } from './user';
import { WebsocketService } from '../websocket.service';

@Injectable()
export class UsersService {
  readonly users$ = this.ws.listen<User[]>('users');

  constructor(private ws: WebsocketService) {}

  searchUsers(users: User[], _term: string) {
    const term = _term.trim().toLowerCase();
    if (!term) {
      return users;
    }

    return users.filter(u => u.name.toLowerCase().includes(term));
  }
}
