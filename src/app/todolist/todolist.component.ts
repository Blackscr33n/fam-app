import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

}
