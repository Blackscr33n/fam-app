import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { FamilyService } from 'src/app/_services/family.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  familyMembers: User[];
  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {    
    this.familyMembers = this.familyService.familyValue.members;
  }

}
