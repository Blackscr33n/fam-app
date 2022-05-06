import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from './reducer';
import * as StoreActions from './actions';
import { switchMap, tap } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { FamilyService } from '../_services/family.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private accountService: AccountService,
        private familyService: FamilyService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    /**
     * this.accountService.setToken(token);

            this.accountService.getByUsername().subscribe(user => {
                if (user) {
                    this.accountService.setUser(user);
                    this.familyService.loadFamily().subscribe();
                    this.router.navigate([this.returnUrl]);
                }
            });
     */

    public login$ = createEffect(() => this.actions$.pipe(
        ofType(StoreActions.login),
        switchMap((username, password) => this.accountService.login(username, password).pipe(
            tap(user => this.accountService.setUser(user)),
            tap(() => this.familyService.loadFamily()),
            tap(() => this.router.navigate([this.route.snapshot.queryParams?.returnUrl || '/'])),
        ).pipe(() => StoreActions.loginSuccess)
        )
    )
}

/**
 * switchMap((username, password) => this.accountService.login(username, password).pipe(
                tap(token => this.accountService.setToken(token)),
                switchMap(() => this.accountService.getByUsername().pipe(
                    tap(user => this.accountService.setUser(user)),
                    tap(() => this.familyService.loadFamily()),
                    tap(() => this.router.navigate([this.route.snapshot.queryParams?.returnUrl || '/'])),
                    tap(() => StoreActions.loginSuccess())
                )),
            ))
 */
