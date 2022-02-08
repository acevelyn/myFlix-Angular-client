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
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any = [];
  user: any = {};
  // favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
  * Initializes the component, gets all movies
  */
  ngOnInit(): void {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
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

  ifFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId);
  }

  /**
   * adds movie to users favorites (backend using {@link FetchApiDataService}, as well as in localStorage and {@link user})
   * @param movieId 
   */
  addFavoriteMovie(movieId: any): void {
    this.fetchApiData.addFavMovie(movieId).subscribe((resp: any) => {
      // localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
      console.log('Movie has been added!');
      this.snackBar.open('Added to Favorites!', 'OK', {
        duration: 4000
      });
    });
  }

  /**
   * removes movie from users favorites (backend using {@link FetchApiDataService}, as well as in localStorage and {@link user})
   * @param movieId 
   */
  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavMovie(movieId).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
      console.log('Movie has been removed!' + this.user.FavoriteMovies);
      this.snackBar.open('Removed from Favorites', 'OK', {
        duration: 4000
      });
    });
  }

  openProfile(): void {
    this.router.navigate(['users/profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

} // end
