import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FlixAngularClient';

  constructor(public dialog: MatDialog) { }

  // Function that will open the sign up dialog when the sign up button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  // Function that will open the login dialog when the login button is clicked
  openLoginForm(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' })
  }

  // Function that will open the movie cards dialog when the all movies button is clicked
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, { width: '500px' })
  }

} // end of class