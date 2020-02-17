import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BackendURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  // The activated url paths
  public path: ActivatedRouteSnapshot[];

  // The activated url path
  public route: ActivatedRouteSnapshot;

  constructor(private _authS:AuthService) { }

  
  /**
   * Check if an user can access to a especific uri
   * 
   * @param {ActivatedRouteSnapshot} next The url the user is trying to access
   */
  public canActivate(next:ActivatedRouteSnapshot):Boolean{
    let isAuth = this._authS.IsAuthenticated();
    let needAuth = this.needAuth(next.url.toString());

    //If the next page needs that user is logged and the user doesn't, 
    // we send him back to the logIn page
    if(!isAuth && needAuth){ 
      window.location.href = BackendURL+"Home/LogIn";
      return false;
    }

    //If the next page doesn't need that the user is logged and the user does,
    // we send him back to the logIn page
    if(isAuth && !needAuth) {
      this._authS.logOut();
      window.location.href = BackendURL+"Home/LogIn";
    }
    return true;
  }

  /**
   * To know if the next page need that the user is logged
   * @param {string} path The path of the next page
   */
  private needAuth(path:string):Boolean{
    let neededAuth = [
      "WeatherForecast"
  ];

  return neededAuth.some(subPath=>
      path.includes(subPath)
    );
  }
}