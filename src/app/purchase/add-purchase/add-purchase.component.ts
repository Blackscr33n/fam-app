import { CategoryMapping } from '@model/purchase';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Purchase } from '@model/purchase';
import { PurchaseService } from '../../_services/purchase.service';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/_services/family.service';
import { Family } from 'src/app/_models';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';

@Component({
    selector: 'app-add-purchase',
    templateUrl: './add-purchase.component.html',
    styleUrls: ['./add-purchase.component.scss'],
})
export class AddPurchaseComponent implements OnInit, OnDestroy {

    public purchase: Purchase;
    public purchaseForm: FormGroup;
    public family: Family;
    public categories: any = Object.values(CategoryMapping);
    public loading = true;
    public subscriptions: Subscription[] = [];

    constructor(
        private purchaseService: PurchaseService,
        private router: Router,
        private familyService: FamilyService,
        private fb: FormBuilder,
        private accountService: AccountService
    ) {
        this.purchase = new Purchase();
    }

    public ngOnInit(): void {
        this.loading = true;
        this.familyService.loadFamily().subscribe(family => {
            this.family = family;
            this.loading = false;
        });
        this.purchaseForm = this.fb.group({
            purchaseDate: [this.purchase?.purchaseDate || ''],
            title: [this.purchase?.title || ''],
            category: [this.purchase?.category || null],
            purchaser: [this.purchase?.purchaser?.id || this.accountService.userValue.id || null],
            amount: [this.purchase?.amount || null]
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public savePurchase(): void {
        this.loading = true;
        this.purchase = new Purchase({
            id: null,
            amount: this.purchaseForm.get('amount').value,
            category: this.purchaseForm.get('category').value,
            purchaseDate: this.purchaseForm.get('purchaseDate').value,
            purchaser: this.purchaseForm.get('purchaser').value,
            title: this.purchaseForm.get('title').value,
        });
        this.purchaseService.addPurchase(this.purchase).subscribe(() => {
            this.purchase = new Purchase();
            this.loading = false;
            this.goToPurchaseList();
        });
    }

    public cancel(): void {
        this.goToPurchaseList();
    }

    public goToPurchaseList(): void {
        this.router.navigate(['purchase']);
    }

}
