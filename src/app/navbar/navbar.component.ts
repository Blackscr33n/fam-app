import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  opened: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

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
