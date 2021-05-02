import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNav(): void {
    this.opened = !this.opened;
  }

  closeNav(): void {
    this.opened = false;
  }

}
