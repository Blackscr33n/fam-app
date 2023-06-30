import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss']
})
export class AccountVerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.queryParams.pipe(filter(params => params.userid), take(1)).subscribe(params => {
        console.log(params.userid);
  });
}

}
