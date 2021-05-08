import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { AddTodoComponent } from './todolist/add-todo/add-todo.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AddPurchaseComponent } from './purchase-list/add-purchase/add-purchase.component';

const routes: Routes = [
  { path: 'todos', component: TodolistComponent},
  { path: 'add-todo', component: AddTodoComponent},
  { path: 'add-purchase', component: AddPurchaseComponent},
  { path: 'purchase-list', component: PurchaseListComponent},
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
