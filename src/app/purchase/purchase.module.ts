import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from 'src/app/purchase/purchase-routing.module';
import { MaterialModule } from 'src/app/_helpers/material.module';
import { PurchaseListComponent } from 'src/app/purchase/purchase-list/purchase-list.component';
import { PurchaseSummaryComponent } from 'src/app/purchase/purchase-summary/purchase-summary.component';
import { DashboardComponent } from 'src/app/purchase/dashboard/dashboard.component';
import { AddPurchaseComponent } from 'src/app/purchase/add-purchase/add-purchase.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComponentsModule } from 'src/app/_components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PurchaseRoutingModule,
        MaterialModule,
        NgxChartsModule,
        ComponentsModule,
        TranslateModule
    ],
    declarations: [
        PurchaseListComponent,
        PurchaseSummaryComponent,
        DashboardComponent,
        AddPurchaseComponent
    ]
})
export class PurchaseModule { }
