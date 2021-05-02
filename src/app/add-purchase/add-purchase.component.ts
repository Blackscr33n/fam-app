import { Component, OnInit } from '@angular/core';
import { Purchase } from '../purchase';
import { PurchaseService } from '../_services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {

  purchase: Purchase;

  constructor(private purchaseService: PurchaseService, private router: Router) {
    this.purchase = this.purchaseService.getNewPurchase();
  }

  ngOnInit(): void {
    
  }

  savePurchase() {
    this.purchaseService.addPurchase(this.purchase);
    this.purchase = this.purchaseService.getNewPurchase();
    this.router.navigate(['purchase-list']);
  }

  cancel() {
    this.router.navigate(['purchase-list']);
  }

}
