import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Message } from './message';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'ola',
      content: 'test 1',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'gryzia',
      content: 'test 3',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test 5',
      date: new Date()
    },
    {
      channel: null,
      user: 'ola',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'ola',
      content: 'test 1',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'gryzia',
      content: 'test 3',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test 5',
      date: new Date()
    },
    {
      channel: null,
      user: 'ola',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    },
    {
      channel: null,
      user: 'tomek',
      content: 'test',
      date: new Date()
    }
  ];

  readonly messages$ = of(this.messages);

  constructor() {}
}
