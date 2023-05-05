import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TodolistComponent } from './todolist.component';


@NgModule({
    imports: [
        MatIconModule
    ],
    declarations: [
        TodolistComponent
    ],
    exports: [],
    providers: []
})
export class TodolistModule { }
