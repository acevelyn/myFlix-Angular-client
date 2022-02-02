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

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any = [];

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


}
