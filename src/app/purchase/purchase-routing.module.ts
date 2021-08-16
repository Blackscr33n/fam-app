import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/_helpers/auth.guard";
import { AddPurchaseComponent } from "src/app/purchase/add-purchase/add-purchase.component";
import { DashboardComponent } from "src/app/purchase/dashboard/dashboard.component";
import { PurchaseListComponent } from "src/app/purchase/purchase-list/purchase-list.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      { path: '', component: PurchaseListComponent, canActivate: [AuthGuard] },
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