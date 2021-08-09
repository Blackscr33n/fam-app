import { PurchaseRoutingModule } from './purchase/purchase-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { AddTodoComponent } from './todolist/add-todo/add-todo.component';
import { AddPurchaseComponent } from './purchase-list/add-purchase/add-purchase.component';
import { AuthGuard } from './_helpers/auth.guard';
import { FamilyComponent } from './family/family.component';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'todos', component: TodolistComponent, canActivate: [AuthGuard]},
  { path: 'add-todo', component: AddTodoComponent, canActivate: [AuthGuard]},
  { path: 'add-purchase', component: AddPurchaseComponent, canActivate: [AuthGuard]},
  { path: 'purchase', loadChildren: PurchaseRoutingModule, canActivate: [AuthGuard]},
  { path: 'family', component: FamilyComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/purchase-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
