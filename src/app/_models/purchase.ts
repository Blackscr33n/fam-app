import * as moment from 'moment';
import { User } from './user';

export enum Category {
    None = "",
    Lebensmittel = "Lebensmittel",
    Baby = "Baby",
    Wohnung = "Wohnung"
}

export interface PurchaseResponse {
    id: string;
    amount: number;
    category: Category;
    purchaseDate: Date;
    purchaser: User;
    title: string;
}

export class Purchase {
    public id: string;
    public amount: number;
    public category: Category;
    public purchaseDate: Date;
    public purchaser: User;
    public title: string;

    constructor(purchaseResponse?: PurchaseResponse) {
        this.id = purchaseResponse?.id || '0';
        this.amount = purchaseResponse?.amount || 0;
        this.category = purchaseResponse?.category || Category.None;
        this.title = purchaseResponse?.title || '';
        this.purchaseDate = purchaseResponse?.purchaseDate || moment().toDate();
        this.purchaser = purchaseResponse?.purchaser || null;
    }

}
