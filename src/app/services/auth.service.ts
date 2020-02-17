import { IdentityService } from './identity.service';
import { LogInUser } from './../models/Auth/LogInUser';
import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignUser } from '../models/allModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Rest {

  constructor(http:HttpClient, private _identityS:IdentityService){
    super(http);
  }

  
  public IsAuthenticated():Boolean{
    try{
      return this._identityS.getToken() != "" && this._identityS.getToken() != null;
    }catch(Exception){
      return false;
    }
  }

  public logOut(){
    if(this.IsAuthenticated()){
      this._identityS.removeSession();
    }
  }

  public signUp(user:SignUser){
    return this.postRequest(user, "Register");
  }
  
  public logIn(user:LogInUser){
    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', user.email)
    .set('password', user.password);
    
    return this.postRequest(body, "login");
  }
}