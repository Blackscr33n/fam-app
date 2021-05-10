import { Injectable } from "@angular/core";
import { User } from "../_models";
import { Family } from "../_models/family";
import { AccountService } from "./account.service";

@Injectable({providedIn: 'root'})
export class FamilyService {
    private family: Family = new Family('0', '', []);

    constructor(private accountService: AccountService) {}

    public get familyValue(): Family {
        return this.family;
    }

    addFamily(family: Family) {
        this.family = family;
    }

    addFamilyMember(user: User) {
        if(
            this.family.members.length == 0 
            ||
            !this.family.members.find((u) => {u.username == user.username})
        ) {
            this.family.members.push(user);
        }
    }
}