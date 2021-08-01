import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fam-app';
  user: User;

  constructor(private accountService: AccountService) {
    moment.locale('de');
    this.accountService.user.subscribe(x => this.user = x);
  }

}
