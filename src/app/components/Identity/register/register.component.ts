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

  public signUpForm: FormGroup; //Log in form
  public passwordsAreEqual: Boolean; // To check if both passwords are the same
  public loading:Boolean; //To know if the loading the log in post request

  constructor(private _authS:AuthService) {
    this.passwordsAreEqual = false; // At the beginning the passwords aren't the same
    this.loading = false; //At the beginning the passwords aren't the same

    this.initializeForm();
  }

  /**
   * Do the signup request
   */
  public signUp(){ 
    this.loading = true; //Start to load the signup request
    this._authS.signUp({
      'email' : this.signUpForm.controls['email'].value,
      'password': this.signUpForm.controls['password'].value,
      'confirmPassword': this.signUpForm.controls['confirmPassword'].value
    }).subscribe(
      _=> {
        setTimeout(_=> this.resetForm(true), 1000);
        window.location.href = BackendURL+"Home/LogIn"; //We navigate to the LogIn page
      },
      _=> this.resetForm(false)
    );
  }

  /**
   * Check if both password in the form are the same
   */
  public equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let confirmPassword = this.signUpForm.controls['confirmPassword'].value;
    this.passwordsAreEqual = ((password == confirmPassword) && password.length>0 && confirmPassword.length>0);
  }

  /**
   * Initializes the form
   */
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

    /**
   * Cleans the form
   * @param {Boolean} full True to clean both inputs, false to remove only the password input
   */
  private resetForm(full:Boolean){
    this.signUpForm.reset({
      'email': full ? "": this.signUpForm.controls['email'].value,
      'password': '',
      'confirmPassword': ''
    });
    this.loading = false; //The request has stopped to load
  }

}
