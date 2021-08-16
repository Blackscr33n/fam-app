import { Component, OnInit } from '@angular/core';
import { Todo } from '../../_models/todo';
import { TodoService } from '../../_services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  todo: Todo;
  showNewTodo = false;

  constructor(private todoService: TodoService, private router: Router) {
    this.todo = this.todoService.getNewTodo();
  }

  saveTodo(): void {
    this.todoService.addTodo(this.todo);
    this.showNewTodo = false;
    this.todo = this.todoService.getNewTodo();
    this.router.navigate(['todos']);
  }

  cancel(): void {
    this.router.navigate(['todos']);
  }

}
