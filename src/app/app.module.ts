import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Material Design Modules
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    AddTodoComponent,
    NavbarComponent,
    PurchaseListComponent,
    AddPurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
