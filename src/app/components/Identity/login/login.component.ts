import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BackendURL } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent  {

  public logInForm: FormGroup; //Log in form
  public loading:Boolean; //To know if the loading the log in post request
  public theresErrorMessage:Boolean; //To know if it was any error on the login
  public error_message:string; //The error message

  constructor(private _authS:AuthService) {
    this.loading = false; //At the beginning the passwords aren't the same
    this.theresErrorMessage = false;
    this.error_message = "";

    this.initializeForm();
  }

  /**
   * Do the logIn request
   */
  public logIn(){ 
    this.loading = true; //Start to load the log in request
    this._authS.logIn({
      'email' : this.logInForm.controls['email'].value,
      'password': this.logInForm.controls['password'].value
    }).subscribe(
      _=> {
        setTimeout(_=> this.resetForm(true), 1000);
        window.location.href = BackendURL+"Home/WeatherForecast"; // We naviagte to the weather forecast page
      },
      err=> {
        this.error_message = err.error["error_description"]; //Set the error message
        this.theresErrorMessage = true; //Show the message and hide it in 3 seconds
        setTimeout(_=> this.theresErrorMessage = false, 3000);
        this.resetForm(false);
      }
    );
  }

  /**
   * Initializes the form
   */
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

  /**
   * Cleans the form
   * @param {Boolean} full True to clean both inputs, false to remove only the password input
   */
  private resetForm(full:Boolean){
    this.logInForm.reset({
      'email': full ? "": this.logInForm.controls['email'].value,
      'password': ''
    });
    this.loading = false; //The request has stopped to load
  }
}
