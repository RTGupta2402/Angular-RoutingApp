import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Observer, Subscription } from 'rxjs';
import 'rxjs/Rx';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsvSubscription: Subscription;
  myObsvSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // creating a simple Observable
    // interval is an observable which emits data in an interval
    // const numberObsv = interval(1000);
    // this.numberObsvSubscription = numberObsv.subscribe(
    //   (number: number) => {
    //     console.log(number);
    //   }
    // );

    const numberObsv = interval(1000).map(
      (data: number) => {
        return data * 2;
      }
    );
    this.numberObsvSubscription = numberObsv.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    // create an observable which will fire after 2 and 4 seconds and fails after 5 seconds.
    const myObservable = Observable.create(
      // Observable created within the anonymous func tells observer (passed as an argument), when it will receive which data.
      // So, after when we subscribe to this observer, it knows when to react to the data.
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000);
        setTimeout(() => {
          // observer.error("Oops! It doesn't work");
          observer.complete();
        }, 5000);
        // non-reachable code.
        setTimeout(() => {
          observer.next("third package");
          // observer.complete();
        }, 6000);
      });

      this.myObsvSubscription = myObservable.subscribe(
        (data: string) => {
          console.log(data);
        },
        (error: string) => {
          console.log(error);
        }, () => {
          console.log('completed'); 
        });
  }

  // onLoadServers() {
  //   this.router.navigate(['/servers']);
  // }
  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.numberObsvSubscription.unsubscribe();
    this.myObsvSubscription.unsubscribe();
  }
}
