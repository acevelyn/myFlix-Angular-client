/**
 * EditProfileComponent brings up a form dialog so users can edit their account information.
 * @module EditProfileComponent
 */


import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  @Input() userProfile = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthday: this.user.Birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.getUserInfo();
  }

  /**
   * call API end-point to get the user's information
   * @function getUser
   * @param user
   * @return user's data in json format
   */
  // getUserInfo(): void {
  //   const user = localStorage.getItem('user');
  //   this.fetchApiData.getUser(user).subscribe((resp: any) => {
  //     this.user = resp;
  //     console.log(this.user);
  //   });
  // }

  /**
   * call API end-point to update user's info
   * @function updateUser
   * @param user
   * @return updates user's data with a string that says success
   */
  editUser(): void {
    this.fetchApiData.updateUser(this.userProfile).subscribe((result) => {
      this.dialogRef.close();
      // updating the localStorage with the updated user info
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Your account has been updated!', 'Great!', {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

}
