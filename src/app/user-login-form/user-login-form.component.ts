/**
 * UserLoginFormComponent displays a form to allow users to logged in with their credentials.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /** 
   * bind form input values to userCredentials object 
   */
  @Input() userCredentials = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
  * Initializes the component
  * @ignore
  */
  ngOnInit(): void { }

  /**
  * Logs the user in by sending a request to the backend endpoint.
  * A snack bar is shown, holding a message about the result of the operation.
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (result) => {
        // set user and token to local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        // log the result
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('Successfully Logged In!', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']);

      }, (result) => {
        console.log(result);
        this.snackBar.open('Invalid Credentials. Please try again.', 'OK', {
          duration: 2000,
        });
      });
  }

}