import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User;

  constructor(
    private accountService: AccountService,
    private translate: TranslateService
  ) {
    moment.locale('de');
    this.accountService.user.subscribe(x => this.user = x);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    if(localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang'));
    }
  }

}
