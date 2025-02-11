import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../_models';
import { Family, FamilyResponse } from '../_models/family';

@Injectable({ providedIn: 'root' })
export class FamilyService {
    private family: Family;

    constructor(
        private apollo: Apollo) {
        this.family = new Family();
    }

    public loadFamily(): Observable<Family> {
        const getFamily = gql`
        query family {
            family {
                id
                name
                members {id, firstname, lastname}
            }
        }
        `;
        return this.apollo.watchQuery<any>({
            query: getFamily,
            context: {
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).valueChanges.pipe(
            map( (response: any) => response.data.family),
            map((response: FamilyResponse) => new Family(response)),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    public get familyValue(): Family {
        return this.family;
    }

    addFamily(family: Family): Observable<Family> {

        if (family.members.length === 0) { return null; }
        const memberIds = [];
        family.members.forEach(member => {
            memberIds.push(member.id);
        });
        const addFamilyCred = gql`
            mutation addFamily
            {
                addFamily(
                    name: "${family.name}",
                    members: "${memberIds}"
                    )
                    {id, name, members { firstname, lastname}}
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
                    userId: "${user.id}"
                    )
                    {id, name, members {id, firstname, lastname}}
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
