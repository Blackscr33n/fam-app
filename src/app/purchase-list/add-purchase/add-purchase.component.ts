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
  loading: boolean;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private familyService: FamilyService
  ) {
    this.purchase = new Purchase();
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.familyService.loadFamily();
    this.family = this.familyService.familyValue;

    this.loading = false;
  }

  savePurchase(): void {
    this.purchaseService.addPurchase(this.purchase);
    this.purchase = new Purchase();
    this.goToPurchaseList();
  }

  cancel(): void {
    this.goToPurchaseList();
  }

  goToPurchaseList(): void {
    this.router.navigate(['purchase-list']);
  }

}
