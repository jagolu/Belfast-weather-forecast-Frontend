import { BackendURL } from './../../../../environments/environment';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent  {

  public signUpForm: FormGroup;
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

  public signUp(){ 
    this.loading = true;
    this._authS.signUp({
      'email' : this.signUpForm.controls['email'].value,
      'password': this.signUpForm.controls['password'].value,
      'confirmPassword': this.signUpForm.controls['confirmPassword'].value
    }).subscribe(
      _=> {
        setTimeout(_=> this.resetForm(true), 1000);
        window.location.href = BackendURL+"Home/LogIn";
      },
      _=> this.resetForm(false)
    );
  }

  public equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let confirmPassword = this.signUpForm.controls['confirmPassword'].value;
    this.passwordsAreEqual = ((password == confirmPassword) && password.length>0 && confirmPassword.length>0);
  }


  private initializeForm(){
    this.signUpForm = new FormGroup({
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
      ),
      'confirmPassword': new FormControl(
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
    this.signUpForm.reset({
      'email': full ? "": this.signUpForm.controls['email'].value,
      'password': '',
      'confirmPassword': ''
    });
    this.loading = false
  }

}
