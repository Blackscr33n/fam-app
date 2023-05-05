import { Component, OnInit } from '@angular/core';
import { Family, User } from '../_models';
import { FamilyService } from '../_services/family.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  familyForm: UntypedFormGroup;
  family: Family;
  userControl: UntypedFormControl = new UntypedFormControl();
  options: User[] = [];
  filteredOptions: User[] = [];
  public isLoading: boolean = false;

  constructor(
    private familyService: FamilyService,
    private accountService: AccountService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.familyForm = this.formBuilder.group({
      familyName: ['', Validators.required],
    });
    this.familyService.loadFamily().subscribe(family => {
      if(family) {
        this.family = family;
      } else {
        this.family = new Family();
      }
    });

    this.userControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.isLoading = true;
          this.filteredOptions = [];
        }),
        switchMap(value => this.accountService.getByName(value).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ))
      ).subscribe(users => {
        this.filteredOptions = users;
      })
  }

  public displayFn(user: User): string {
    return user ? user.firstname + ' ' + user.lastname : '';
  }

  public addToFamily(): void {
    if(this.family.id) {
      this.familyService.addFamilyMember(this.userControl.value);
    } else {
      this.family.members.push(this.userControl.value);
    }
  }

  public addFamily(): void {
    this.family.name = this.familyForm.value.familyName;
    this.family.members.push(this.userControl.value);
    this.familyService.addFamily(this.family).subscribe(family => {
      this.family = family;
      this.userControl.reset();
    });

  }

}
