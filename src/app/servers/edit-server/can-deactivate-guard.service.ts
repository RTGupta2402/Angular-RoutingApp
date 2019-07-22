import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// a contract that can be implemented by a class - forces the class to provide some logic.
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// the service itself implements 'CanDeactivate' interface of generic type - wraps up our interface and thus forces a component/class to implement canDeactivate() method.
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    
    // component (must implement CanComponentDeactivate) 
    canDeactivate(component: CanComponentDeactivate,
             currentRoute: ActivatedRouteSnapshot, 
             currentState: RouterStateSnapshot, 
             nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                 return component.canDeactivate();
             }
}