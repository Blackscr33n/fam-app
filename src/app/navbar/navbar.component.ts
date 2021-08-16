import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements DoCheck {

  opened = false;
  isLoggedIn = false;

  constructor(private accountService: AccountService) { }

  ngDoCheck(): void {
    if (this.accountService.userValue) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  toggleNav(): void {
    this.opened = !this.opened;
  }

  closeNav(): void {
    this.opened = false;
  }

  logout(): void {
    this.closeNav();
    this.accountService.logout();
  }

}
