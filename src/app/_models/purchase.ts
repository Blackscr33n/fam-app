import { User } from "./user";

export interface Purchase {
    id: number;
    title: String;
    amount: number;
    purchaseDate: Date;
    purchaser: String;
}
