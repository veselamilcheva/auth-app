import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
    ): 
    | boolean 
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
        return this.authService.user
        .pipe(
            take(1), //make sure it is always taken the latest user value and then unsubscribe from the guard execution, so there isn't ongoing user subscribtion
            map(user => {
               const isAuth =  !!user;
               if(isAuth) {
                   return true;
               }
               return this.router.createUrlTree(['/auth'])
            })
            // tap(isAuth => {
            //     if(!isAuth) {
            //         this.router.navigate(['/auth']) //v.2-8
            //     }
            // })
            );
    }
}