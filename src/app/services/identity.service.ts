import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private readonly __sessionStorageKey = "session";

  constructor() { }



  public getToken():string{
    try{
      return this.getSession();
    }catch(Exception){
      return "";
    }
  }
 

  public setSession(token: string):void{
    sessionStorage.setItem(
      this.__sessionStorageKey, token
    );
  }

  public removeSession():void{
    sessionStorage.removeItem(this.__sessionStorageKey);
  }

  
  private getSession():string{
    return sessionStorage.getItem(this.__sessionStorageKey);
  }
}