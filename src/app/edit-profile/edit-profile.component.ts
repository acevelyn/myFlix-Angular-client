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

  @Input() newData = { Username: '', Password: '', Email: '', Birthday: '' };

  userProfile: any = {
    Username: this.data.username,
    Password: this.data.password,
    Email: this.data.email,
    Birthday: this.data.birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      password: string;
      email: string;
      birthday: Date;
    }
  ) { }

  ngOnInit(): void {
  }



  /**
   * call API end-point to update user's info
   * @function updateUser
   * @param user
   * @return updates user's data with a string that says success
   */
  editUser(): void {
    this.fetchApiData.updateUser(this.data.username, this.newData).subscribe((resp: any) => {
      this.dialogRef.close();
      window.location.reload();
      // updating the localStorage with the updated user info
      localStorage.setItem('user', JSON.stringify(resp));
      console.log(resp);
      this.snackBar.open('Your account has been updated!', 'Great!', {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

}
