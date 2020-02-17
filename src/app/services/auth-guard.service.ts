import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BackendURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The activated url paths
   * 
   * @access public
   * @var {ActivatedRouteSnapshot[]} path
   */
  public path: ActivatedRouteSnapshot[];

  /**
   * The activated url path
   * 
   * @access public
   * @var {ActivatedRouteSnapshot} route
   */
  public route: ActivatedRouteSnapshot;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} __authService To know if the user is already logged
   */
  constructor(private _authS:AuthService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Check if an user can access to a especific uri
   * 
   * @access public
   * @param {ActivatedRouteSnapshot} next The url the user is trying to access
   * @return {Boolean} True if the user is authenticated, false otherwise
   */
  public canActivate(next:ActivatedRouteSnapshot):Boolean{
    let isAuth = this._authS.IsAuthenticated();
    let needAuth = this.needAuth(next.url.toString());
    if(!isAuth && needAuth){
      window.location.href = BackendURL+"Home/LogIn";
      return false;
    }

    if(isAuth && !needAuth) {
      this._authS.logOut();
      window.location.href = BackendURL+"Home/LogIn";
    }
    return true;
  }

  private needAuth(path:string):Boolean{
    let neededAuth = [
      "WeatherForecast"
  ];

  return neededAuth.some(subPath=>
    path.includes(subPath)
  );
  }
}