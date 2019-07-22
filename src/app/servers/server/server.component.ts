import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['serverData'];
      }
    );

    // the param 'id' fetched as below is a string - '1' and not a number. To interpret it as a number, we add '+' sign in the beginning.
    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
