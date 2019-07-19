import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // no error is thrown because navigate() doesn't know on which route we are currently on (unlike routerLink).
    // the routerLink always knows in which component template it sits - so it knows the currently active route.
    // To inform about currently active route, another argument is passed - JS object which can be configured in many ways.
    // One of the configuration is 'relativeTo' property - where it is defined relative to which route(of type ActivatedRoute) this link should be loaded - bydefault - root.
    
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
