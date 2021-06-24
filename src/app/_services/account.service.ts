import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

import { environment } from '../../environments/environment';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private apollo: Apollo
    ) {
        this.initUser();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }


    public async login(username, password) {
        const login_cred = gql`
            mutation login
            {
                login(
                    email: "${username}",
                    password: "${password}"
                    )
            }
        `;
        
        var res = await this.apollo.mutate({
            mutation: login_cred
        }).toPromise();
        
        localStorage.setItem('token', res.data['login']);
        const userRes = await this.getByUsername();
        localStorage.setItem('user', JSON.stringify(userRes.data.user));
        this.initUser();

        return this.userValue;
    }

    initUser() {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    async register(user: User) {
        var firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
        var lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
        const register_mut = gql`
        mutation register {
            register (
                firstname: "${firstname}"
                lastname: "${lastname}"
                email: "${user.username}"
                password: "${user.password}"
            )
            {email,firstname,lastname}
        }
        `;

        var res = await this.apollo.mutate({
            mutation: register_mut
        }).toPromise();

        if(res.errors) {
            throw new Error(res.errors[0].message)
        }

        return res.data['register'];
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    private GET_USER = gql`
        query user {
            user {
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
        }).result()
    }


}