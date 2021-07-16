import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { Family, FamilyResponse } from '../_models/family';

@Injectable({ providedIn: 'root' })
export class FamilyService {
    private family: Family;

    constructor(
        private apollo: Apollo) {
        this.family = new Family();
    }

    public loadFamily(): void {
        const getFamily = gql`
        query family {
            family {
                name
                members {id, firstname,lastname}
            }
        }
        `;
        this.apollo.watchQuery<any>({
            query: getFamily,
            context: {
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).valueChanges.pipe(
            map(response => response.data.family),
            map((response: FamilyResponse) => new Family(response))
        ).subscribe((family: Family) => this.family = family);
    }

    public get familyValue(): Family {
        return this.family;
    }

    addFamily(family: Family): Observable<Family> {
        const addFamilyCred = gql`
            mutation addFamily
            {
                addFamily(
                    name: '${family.name}',
                    members: '${family.members}'
                    )
            }
        `;

        return this.apollo.mutate({
            mutation: addFamilyCred
        }).pipe(
            map( (response: any) => response.data.addFamily),
            map((response: FamilyResponse) => new Family(response))
        );
    }

    addFamilyMember(user: User): Observable<Family> {
        const addFamilyMemberMutation = gql`
            mutation addFamilyMember
            {
                addFamilyMember(
                    userId: '${user.id}'
                    )
                    {name, members {id, firstname, lastname}}
            }
        `;

        return this.apollo.mutate({
            mutation: addFamilyMemberMutation
        }).pipe(
            map( (response: any) => response.data.addFamilyMember),
            map( (response: FamilyResponse) => new Family(response))
        );
    }
}
