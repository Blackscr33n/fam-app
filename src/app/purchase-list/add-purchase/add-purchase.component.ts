import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../_models/purchase';
import { PurchaseService } from '../../_services/purchase.service';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/_services/family.service';
import { Family } from 'src/app/_models';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {

  purchase: Purchase;
  family: Family;
  loading: Boolean;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private familyService: FamilyService
    ) {
    this.purchase = this.purchaseService.getNewPurchase();
  }

  async ngOnInit() {
    this.loading = true;
    await this.familyService.loadFamily();
    this.family = this.familyService.familyValue;
    console.log(this.family);
    
    this.loading = false;
  }

  savePurchase() {
    this.purchaseService.addPurchase(this.purchase);
    this.purchase = this.purchaseService.getNewPurchase();
    this.goToPurchaseList();
  }

  cancel() {
    this.goToPurchaseList();
  }

  goToPurchaseList() {
    this.router.navigate(['purchase-list']);
  }

}
