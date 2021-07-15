import * as moment from "moment";
import { User } from "./user";

export interface PurchaseResponse {
    id: string;
    amount: number;
    category: string;
    purchaseDate: Date;
    purchaser: User;
    title: string;
}

export class Purchase {
    public id: string;
    public amount: number;
    public category: string;
    public purchaseDate: Date;
    public purchaser: User;
    public title: string;

    constructor();
    constructor(purchaseResponse: PurchaseResponse);
    constructor(purchaseResponse?: PurchaseResponse) {
        this.id = purchaseResponse.id || '0';
        this.amount = purchaseResponse.amount || 0;
        this.category = purchaseResponse.category || '';
        this.title = purchaseResponse.title || '';
        this.purchaseDate = purchaseResponse.purchaseDate || moment().toDate();
        this.purchaser = purchaseResponse.purchaser || null;
    }

}