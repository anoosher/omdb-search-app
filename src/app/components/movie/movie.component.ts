import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  _movie: Movie;
  @Output() getMovieDetails = new EventEmitter<string>();

  @Input() set movie(value: Movie) {
    this._movie = value;
  }
  get movie() {
    return this._movie;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
