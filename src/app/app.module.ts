import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Material Design Modules


import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AddTodoComponent } from './todolist/add-todo/add-todo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AddPurchaseComponent } from './purchase-list/add-purchase/add-purchase.component';
import { PurchaseSummaryComponent } from './purchase-list/purchase-summary/purchase-summary.component';
import { AlertComponent } from './_components/alert/alert.component';
import { FamilyComponent } from './family/family.component';
import { MembersComponent } from './family/members/members.component';
import { FamilyService } from './_services/family.service';
import { GraphQLModule } from './graphql.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './_helpers/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    AddTodoComponent,
    NavbarComponent,
    PurchaseListComponent,
    AddPurchaseComponent,
    PurchaseSummaryComponent,
    AlertComponent,
    FamilyComponent,
    MembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    GraphQLModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    FamilyService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
