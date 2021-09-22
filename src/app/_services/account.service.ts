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


    public login(username, password): Observable<string> {
        const loginCred = gql`
            mutation login
            {
                login(
                    email: "${username}",
                    password: "${password}"
                    )
            }
        `;

        return this.apollo.mutate({
            mutation: loginCred
        }).pipe(
            map(res => (res.data as any).login)
        );

    }

    public setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    public setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.initUser();
    }

    private initUser(): void {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public logout(): void {
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

    public getByUsername(): Observable<User> {
        return this.apollo.watchQuery<any>({
            query: this.GET_USER,
            context: {
                // example of setting the headers with context per operation
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            },
        }).valueChanges.pipe(
            map(res => res.data.user),
            map(res => new User(res))
        )
    }

    public getByName(name: string): Observable<User[]> {
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
