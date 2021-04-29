import { Injectable } from '@angular/core';
import { Todo } from './todo';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  todos: Todo[] = [
    {id: 0, title: 'first todo', dueDate: moment().toDate(), isDone: false }
  ];

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

}
