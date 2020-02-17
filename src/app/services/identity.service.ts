import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  // The id of the session in the storage of the browser
  private readonly __sessionStorageKey = "session";

  constructor() { }

  /**
   * Get the session token of the browser storage
   */
  public getToken():string{
    try{
      return this.getSession();
    }catch(Exception){
      return "";
    }
  }
 
  /**
   * Saves the session token in the browser storage
   * @param {string} token The session token
   */
  public setSession(token: string):void{
    sessionStorage.setItem(
      this.__sessionStorageKey, token
    );
  }

  /**
   * Removes the session token from the browser storage
   */
  public removeSession():void{
    sessionStorage.removeItem(this.__sessionStorageKey);
  }

  /**
   * Get the information stored on the browser storage
   */
  private getSession():string{
    return sessionStorage.getItem(this.__sessionStorageKey);
  }
}