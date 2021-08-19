import { Component, Input } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  @Input('members') public familyMembers: User[];
  constructor() { }

}
