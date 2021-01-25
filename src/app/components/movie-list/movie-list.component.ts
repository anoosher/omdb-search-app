import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  _movieList: Movie[] = [];
  _isHavingASearchedText = false;
  _error = "";
  _searchResultCount=0;
  @Output() updateMovieListForGetDetails = new EventEmitter<string>();
  @Output() goToFirstPage= new EventEmitter<boolean>();
  @Output() goToPreviousPage= new EventEmitter<boolean>();
  @Output() goToNextPage= new EventEmitter<boolean>();
  @Output() goToLastPage= new EventEmitter<boolean>();


  @Input() set movieList(value: Movie[]) {
    this._movieList = value;
  }
  get movieList() {
    return this._movieList;
  }

  @Input() set isHavingASearchedText(value: boolean) {
    this._isHavingASearchedText = value;
  }
  get isHavingASearchedText() {
    return this._isHavingASearchedText;
  }

  @Input() set error(value: string) {
    this._error = value;
  }
  get error() {
    return this._error;
  }

  @Input() set searchResultCount(value: number) {
    this._searchResultCount = value;
  }
  get searchResultCount() {
    return this._searchResultCount;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onGetMovieDetails(imdbID: string) {
    console.log("onGetMovieDetails with imdbID of " + imdbID);
    this.updateMovieListForGetDetails.emit(imdbID);
  }

}
