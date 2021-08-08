import { CategoryMapping } from './../../_models/purchase';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, Purchase } from '../../_models/purchase';
import { PurchaseService } from '../../_services/purchase.service';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/_services/family.service';
import { Family } from 'src/app/_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss'],
})
export class AddPurchaseComponent implements OnInit, OnDestroy {

  public purchase: Purchase;
  public family: Family;
  public categories: any = Object.values(CategoryMapping);
  public loading: boolean = true;
  public subscriptions: Subscription[]= [];

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private familyService: FamilyService
  ) {
    this.purchase = new Purchase();
    console.log(this.categories);
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.familyService.loadFamily().subscribe(family => {
      this.family = family;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  savePurchase(): void {
    this.loading = true;
    console.log(this.purchase);
    
    this.purchaseService.addPurchase(this.purchase).subscribe(purchase => {
      this.purchase = new Purchase();
      this.loading = false;
      this.goToPurchaseList();
    });
  }

  cancel(): void {
    this.goToPurchaseList();
  }

  goToPurchaseList(): void {
    this.router.navigate(['purchase-list']);
  }

}
