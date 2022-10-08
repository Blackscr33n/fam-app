import dayjs from 'dayjs';
import { User } from './user';

export enum Category {
    None = '',
    Lebensmittel = 'Lebensmittel',
    Baby = 'Baby',
    Wohnung = 'Wohnung',
    Freizeit = 'Freizeit',
    Auto = 'Auto'
}

export const CategoryMapping: Record<Category, string> = {
    [Category.None]: '',
    [Category.Baby]: 'Baby',
    [Category.Lebensmittel]: 'Lebensmittel',
    [Category.Wohnung]: 'Wohnung',
    [Category.Freizeit]: 'Freizeit',
    [Category.Auto]: 'Auto',
};

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
        this.purchaseDate = purchaseResponse?.purchaseDate || dayjs().toDate();
        this.purchaser = purchaseResponse?.purchaser || null;
    }

}
