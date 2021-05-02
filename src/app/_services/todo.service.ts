import { Injectable } from '@angular/core';
import { Todo } from '../todo';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  currentId = 1;

  todos: Todo[] = [
    {id: 0, title: 'first todo', dueDate: moment().toDate(), isDone: false }
  ];

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.currentId ++;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getNewTodo(): Todo {
    return {id:this.currentId , title: '', dueDate: moment().toDate(), isDone: false }
  }

}
