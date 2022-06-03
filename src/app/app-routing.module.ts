import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { AddTodoComponent } from './todolist/add-todo/add-todo.component';
import { AuthGuard } from './_helpers/auth.guard';
import { FamilyComponent } from './family/family.component';
import { SettingsComponent } from './settings/settings.component';
const accountModule = () => import('src/app/account/account.module').then(x => x.AccountModule);
const purchaseModule = () => import('src/app/purchase/purchase.module').then(x => x.PurchaseModule);

const routes: Routes = [
    { path: 'account', loadChildren: accountModule },
    { path: 'todos', component: TodolistComponent, canActivate: [AuthGuard] },
    //{ path: 'add-todo', component: AddTodoComponent, canActivate: [AuthGuard]},
    { path: 'purchase', loadChildren: purchaseModule, canActivate: [AuthGuard] },
    { path: 'family', component: FamilyComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/purchase/dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
