import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/todo.service';
import { Todo } from 'src/app/_models/todo';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

    public todos: Todo[] = [];
    constructor(private todoService: TodoService) { }

    public ngOnInit(): void {
        this.todos = this.todoService.getTodos();
    }

}
