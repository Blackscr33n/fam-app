import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models';
import { FamilyService } from 'src/app/_services/family.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  public familyMembers: User[];
  public subscriptions: Subscription[] = [];
  constructor(private familyService: FamilyService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.familyService.loadFamily().subscribe(family => this.familyMembers = family.members)
    );
  }

}
