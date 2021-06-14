import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Family, User } from '../_models';
import { FamilyService } from '../_services/family.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  family: Family;
  userControl: FormControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;

  constructor(private accountService: AccountService, private familyService: FamilyService) { }

  ngOnInit(): void {
    this.accountService.getAll().subscribe((users) => {
      
      this.options = users;
    });
    this.family = this.familyService.familyValue;

    this.filteredOptions = this.userControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.username ? user.username : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }

  addToFamily() {
    this.familyService.addFamilyMember(this.userControl.value);
    
  }

}
