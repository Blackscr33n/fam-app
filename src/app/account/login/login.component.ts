import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';
import { FamilyService } from 'src/app/_services/family.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private familyService: FamilyService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams?.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f(): { [key: string]: AbstractControl } { return this.form.controls; }

    async onSubmit(): Promise<void> {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const user = await this.accountService.login(this.f.username.value, this.f.password.value).catch((err) => {
            this.alertService.error(err);
            this.error = err;
            this.submitted = false;
            this.loading = false;
        });

        if (user) {
            this.familyService.loadFamily();
            this.router.navigate([this.returnUrl]);
        }
    }

}
