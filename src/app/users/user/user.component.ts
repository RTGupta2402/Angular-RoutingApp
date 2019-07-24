import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  sample_id: number;

  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.sample_id = +params['id'];
      }
    );
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  onActivateUser() {
    this.userService.userActivated.next(this.sample_id);
  }

  // not necessary since Angular takes care of it.
  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
