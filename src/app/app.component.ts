import { Component } from '@angular/core';
import { Movie } from './models/Movie';
import { OMDBDataService } from './services/OMDBDataService';
import { SearchResult } from './models/SearchResult';
import { Page } from './models/Page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OMDBDataService]
})

export class AppComponent {
  title = 'OMDB Search App';
  movies: Movie[] = [];
  searchResult: SearchResult;
  selectedMovie: Movie;
  searchText = "";
  searchError = "";
  isHavingASearchedText = false;
  searchResultCount = 0;

  constructor(
    private dataService: OMDBDataService,
  ) {
  }

  getSearchedMovies(page?: Page): void {
    console.log("getSearchedMovies");
    this.isHavingASearchedText = true;
    this.dataService.getMoviesBySearchText(this.searchText, page ? page : Page.First).subscribe(res => {
      this.searchResult = res["body"];
      console.log(this.searchResult.Response.valueOf());
      if (this.searchResult.Response.toString() === "True") {
        this.movies = this.searchResult.Search;
        this.searchResultCount = this.searchResult.totalResults;
        this.searchError = "";
      }
      else {
        this.searchError = this.searchResult.Error;
        console.error(this.searchError);
        this.movies =[];
      }
    });
  }

  onUpdateMovieListForGetDetails(imdbID: string) {

    this.dataService.getMoviesById(imdbID).subscribe(res => {
      this.selectedMovie = JSON.parse(JSON.stringify(res));
      var movieToBeUpdated = this.movies.find(x => x.imdbID == imdbID);
      movieToBeUpdated.Actors = this.selectedMovie.Actors;
      movieToBeUpdated.Plot = this.selectedMovie.Plot;
      movieToBeUpdated.Ratings = this.selectedMovie.Ratings;
      movieToBeUpdated.isDetailed = true;
    });
  }

  onGoToFirstPage(event: boolean) {
    if (event) {
      this.getSearchedMovies(Page.First);
    }
  }

  onGoToPreviousPage(event: boolean) {
    if (event) {
      this.getSearchedMovies(Page.Previous);
    }
  }

  onGoToNextPage(event: boolean) {
    if (event) {
      this.getSearchedMovies(Page.Next);
    }
  }

  onGoToLastPage(event: boolean) {
    if (event) {
      this.getSearchedMovies(Page.Last);
    }
  }

}
