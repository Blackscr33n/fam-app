import { Component, OnInit } from '@angular/core';
import { Family, User } from '../_models';
import { FamilyService } from '../_services/family.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  family: Family;
  userControl: FormControl = new FormControl();
  options: User[] = [];
  filteredOptions: User[] = [];
  public isLoading: boolean = false;

  constructor(
    private familyService: FamilyService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.familyService.loadFamily().subscribe(family => this.family = family);

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
    console.log(this.userControl.value);
    
    this.familyService.addFamilyMember(this.userControl.value);
  }

}
