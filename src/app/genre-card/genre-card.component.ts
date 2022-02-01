import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})

export class GenreCardComponent implements OnInit {
  // genre: any = this.data.name;

  constructor(
    // public fetchApiData: FetchApiDataService,
    // public dialog: MatDialog<GenreCardComponent>

    @Inject(MAT_DIALOG_DATA) public data: { name: string; description: string }

  ) { }

  ngOnInit(): void {
    // this.getGenreDescription(this.genre)
  }

  //   getGenreDescription(currentGenre: string): void {
  //     this.fetchApiData.getGenre(currentGenre).subscribe((resp: any) => {
  //       this.genre = resp;
  //       return this.genre
  //     });
  //   }
}
