import { HttpHeaders } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { User } from "../_models";
import { Family } from "../_models/family";
import { AccountService } from "./account.service";


@Injectable({providedIn: 'root'})
export class FamilyService implements OnInit {
    private family: Family = new Family('0', '', []);

    constructor(
        private accountService: AccountService,
        private apollo: Apollo) {}

    ngOnInit(): void {
        if(this.accountService.userValue) {
            this.loadFamily();
        }
    }

    public async loadFamily() {
        const getFamily = gql`
        query family {
            family {
                name
                members {id, firstname,lastname}
            }
        }
        `;
        const res = await this.apollo.watchQuery<any>({
            query: getFamily,
            context: {
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).result();
        this.family = res.data['family'];
        //this.family = data;
    }

    public get familyValue(): Family {
        return this.family;
    }

    async addFamily(family: Family) {
        const addFamily_cred = gql`
            mutation addFamily
            {
                addFamily(
                    name: "${family.name}",
                    members: "${family.members}"
                    )
            }
        `;
        
        return await this.apollo.mutate({
            mutation: addFamily_cred
        }).toPromise();
    }

    async addFamilyMember(user: User) {
        const addFamilyMember_mutation = gql`
            mutation addFamilyMember
            {
                addFamily(
                    userId: "${user.id}"
                    )
            }
        `;
        
        return await this.apollo.mutate({
            mutation: addFamilyMember_mutation
        }).toPromise();
    }
}