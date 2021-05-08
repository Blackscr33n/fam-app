import { Component, OnInit } from '@angular/core';
import { Todo } from '../../_models/todo';
import { TodoService } from '../../_services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todo: Todo;
  showNewTodo: Boolean = false;

  constructor(private todoService: TodoService, private router: Router) {
    this.todo = this.todoService.getNewTodo();
  }

  ngOnInit(): void {
    
  }

  saveTodo() {
    this.todoService.addTodo(this.todo);
    this.showNewTodo = false;
    this.todo = this.todoService.getNewTodo();
    this.router.navigate(['todos']);
  }

  cancel() {
    this.router.navigate(['todos']);
  }

}
