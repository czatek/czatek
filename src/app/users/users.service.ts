import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    },
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    },
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    },
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    },
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    },
    {
      email: 'tomek@janas.tk',
      name: 'tomek'
    },
    {
      email: 'ola@janas.tk',
      name: 'ola'
    },
    {
      email: 'gryzia@janas.tk',
      name: 'gryzia'
    }
  ];

  constructor() {}

  searchUsers(_term: string) {
    const term = _term.trim().toLowerCase();
    if (!term) {
      return of(this.users);
    }

    return of(this.users.filter(u => u.name.toLowerCase().includes(term)));
  }
}
