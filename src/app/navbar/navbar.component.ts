import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  opened: boolean = false;

  constructor(private accountService: AccountService) { }

  toggleNav(): void {
    this.opened = !this.opened;
  }

  closeNav(): void {
    this.opened = false;
  }

  logout() {
    this.closeNav();
    this.accountService.logout();
  }

}
