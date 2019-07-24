import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    {
      id: 1,
      name: 'Max',
      userActivated: false
    },
    {
      id: 2,
      name: 'Anna',
      userActivated: false
    },
    {
      id: 3,
      name: 'Chris',
      userActivated: false
    }
  ];
  
  constructor(private userService: UsersService) {  }

  ngOnInit() {
    this.userService.userActivated.subscribe(
      (id: number) => {
        for (let user of this.users) {
          if(id === user.id) {
            user.userActivated = true;
          }
        }
      }
    );
  }

}
