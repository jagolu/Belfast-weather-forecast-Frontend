import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BackendURL } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent  {

  public logInForm: FormGroup;
  public passwordType: string;
  public passwordsAreEqual: Boolean;
  public loading:Boolean;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} __authenticationS To do the
   * sign up request 
   */
  constructor(private _authS:AuthService) {
    this.passwordsAreEqual = false;
    this.loading = false;
    if(this._authS.IsAuthenticated()){
      this._authS.logOut();
    }

    this.initializeForm();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  public logIn(){ 
    this.loading = true;
    this._authS.logIn({
      'email' : this.logInForm.controls['email'].value,
      'password': this.logInForm.controls['password'].value
    }).subscribe(
      _=> {
        setTimeout(_=> this.resetForm(true), 1000);
        window.location.href = BackendURL+"Home/WeatherForecast";
      },
      _=> this.resetForm(false)
    );
  }


  private initializeForm(){
    this.logInForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    })
  }

  private resetForm(full:Boolean){
    this.logInForm.reset({
      'email': full ? "": this.logInForm.controls['email'].value,
      'password': ''
    });
    this.loading = false;
  }
}
