import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
	AbstractControl,
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from "@angular/forms";

import { AccountService } from "../../_services/account.service";
import { AlertService } from "../../_services/alert.service";
import { FamilyService } from "src/app/_services/family.service";
import { take } from "rxjs";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
	public form: UntypedFormGroup;
	public loading = false;
	public submitted = false;
	private returnUrl: string;
	public error: string;

	constructor(
		private formBuilder: UntypedFormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private alertService: AlertService,
		private familyService: FamilyService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams?.returnUrl || "/";
	}

	// convenience getter for easy access to form fields
	get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	public onSubmit(): void {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		this.accountService
			.login(this.f.username.value, this.f.password.value)
			.pipe(take(1))
			.subscribe(
				(token) => {
					this.accountService.setToken(token);

					this.accountService.getByUsername().subscribe((user) => {
						if (user) {
							this.accountService.setUser(user);
							this.familyService.loadFamily().subscribe();
							this.router.navigate([this.returnUrl]);
						}
					});
				},
				(err) => {
					this.alertService.error(err);
					this.error = err;
					this.submitted = false;
					this.loading = false;
				},
			);
	}
}
