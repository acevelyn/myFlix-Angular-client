import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

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

      }, (result) => {
        console.log(result);
        this.snackBar.open('Invalid Credentials. Please try again.', 'OK', {
          duration: 2000,
        });
      });
  }

}