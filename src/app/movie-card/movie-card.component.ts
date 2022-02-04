/**
 * MovieCardComponent displays information about a movie, such as title, poster image, director, genre and description.
 * Users are able to like a movie by clicking on the heart shaped icon.
 * @module MovieCardComponent
 */


import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // user: any = JSON.parse(localStorage.getItem('user') || '');
  user: any = {};
  movies: any = [];
  favMovies: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
  * Initializes the component, gets all movies
  */
  ngOnInit(): void {
    this.getMovies();
    this.getUserInfo();
    this.getFavoriteMovies();

  }

  /**
  * Fetches all movies from the database
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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

  getFavoriteMovies(): void {
    let user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log('Current favorites: ' + this.favMovies);
    })
  }


  // add movie to user's favorite (heart icon in html file)
  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Successfully added to favorites!', 'OK', {
        duration: 4000
      })
      this.ngOnInit()
    });
    return this.getFavoriteMovies();
  }

  // remove movie from user's favorites (create button for this option in html)


  /**
   * Open modal with {@link MovieDetailsComponent}
   * @param title title of the movie {string}
   * @param description description of the movie {string}
   */
  openMovieDetailsDialog(
    title: string,
    description: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title,
        description
      },
      width: '500px'
    });
  }


  /**
   * Open modal with {@link GenreCardComponent}
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '300px'
    });
  }

  /**
   * Open modal with {@link DirectorCardComponent}
   * @param name name of the director {string}
   * @param bio bio of the director {string}
   * @param birthdate birthday of the director {date}
   * @param deathDate death date of the director {date}
   */
  openDirectorDialog(name: string, bio: string, birthDate: any, deathDate: any): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birthDate,
        deathDate
      },
      width: '500px'
    });
  }


} // end
