/**
 * WelcomePageComponent is the greeting screen in the application that allows to sign up or log in.
 * @module WelcomePageComponent
 */


import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  /**
  * Initializes the component
  * @ignore
  */
  ngOnInit(): void { }

  /**
   * Open modal with {@link UserRegistrationFormComponent}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Open modal with {@link UserLoginFormComponent}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' })
  }

}
