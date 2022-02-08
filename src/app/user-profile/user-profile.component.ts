/**
 * UserProfileComponent allows users to view their account information with the options to
 * Edit their account information or delete their account
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  // user: any = JSON.parse(localStorage.getItem('user') || '')
  FavMovies: any = [];
  // Username = localStorage.getItem('user');


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
  }

  /**
   * call API end-point to get the user's information
   * @function getUser
   * @param user
   * @return user's data in json format
   */
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    if (user) {
      this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      })
    }
  }

  /**
   * get user's FavoriteMovies from the user's data
   */
  getFavoriteMovies(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    combineLatest(
      this.fetchApiData.getUser(user.Username),
      this.fetchApiData.getAllMovies()
    ).subscribe(([user, movies]) => {
      this.FavMovies = user.FavoriteMovies.map(
        (movieId: string) => movies.find((m: { _id: string }) => m._id == movieId)
      )
      console.log(this.FavMovies);
    })

  }

  /**
   * open a dialog to edit the user profile info
   * @module EditProfileComponent
   */
  openEditUserDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '350px'
    });
  }

  /**
   * delete user account in backend and localStorage, 
   * then redirect to {@link WelcomePageComponent}
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open(`Account has been deleted!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

}
