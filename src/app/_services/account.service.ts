import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

import { User, UserResponse } from '../_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private apollo: Apollo
    ) {
        this.initUser();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }


    public async login(username, password): Promise<User> {
        const loginCred = gql`
            mutation login
            {
                login(
                    email: "${username}",
                    password: "${password}"
                    )
            }
        `;

        const res = await this.apollo.mutate({
            mutation: loginCred
        }).toPromise();

        localStorage.setItem('token', (res.data as any).login);
        const userRes = await this.getByUsername();
        localStorage.setItem('user', JSON.stringify(userRes.data.user));
        this.initUser();

        return this.userValue;
    }

    initUser(): void {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    logout(): void {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    async register(user: User): Promise<any> {
        const firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
        const lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
        const registerMutation = gql`
        mutation register {
            register (
                firstname: "${firstname}"
                lastname: "${lastname}"
                email: "${user.username}"
                password: "${user.password}"
            )
            {id,email,firstname,lastname}
        }
        `;

        const res = await this.apollo.mutate({
            mutation: registerMutation
        }).toPromise();

        if (res.errors) {
            throw new Error(res.errors[0].message);
        }

        return (res.data as any).register;
    }

    private GET_USER = gql`
        query user {
            user {
                id
                email
                firstname
                lastname
            }
        }
    `;

    getByUsername(): Promise<any> {
        return this.apollo.watchQuery<any>({
            query: this.GET_USER,
            context: {
                // example of setting the headers with context per operation
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).result();
    }

    getByName(name: string): Observable<User[]> {
        const query = gql`
        query userByName {
            userByName(name: "${name}") {
                id
                firstname
                lastname
            }
        }
    `;
        return this.apollo.watchQuery<any>({
            query: query,
            context: {
                // example of setting the headers with context per operation
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).valueChanges.pipe(
            map(response => response.data.userByName),
            map(response => response.map((user: UserResponse) => new User(user))
            )
        );
    }

}
