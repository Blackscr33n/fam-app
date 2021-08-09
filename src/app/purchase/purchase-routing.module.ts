import { PurchaseListComponent } from './../purchase-list/purchase-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddPurchaseComponent } from '../purchase-list/add-purchase/add-purchase.component';
import { DashboardComponent } from '../purchase-list/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: PurchaseListComponent, canActivate: [AuthGuard],
        children: [
            { path: 'add', component: AddPurchaseComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule { }
