import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchResult } from '../models/SearchResult';
import { Page } from '../models/Page';


@Injectable({
  providedIn: 'root'
}
)
export class OMDBDataService {
  apiURL: string = 'http://www.omdbapi.com/';
  apiKey: string = "dbf20190";
  lastPage: number = 1;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private httpClient: HttpClient) { }

  public getMoviesById(id: string) {
    return this.httpClient.get(`${this.apiURL}/?i=${id}&apikey=${this.apiKey}`);
  }

  getMoviesBySearchText(searchText: string, page: Page) {
    console.log("getMoviesBySearchText");

    switch (page) {
      case Page.First:
        this.currentPage = 1;
        break;
      case Page.Last:
        this.currentPage = this.lastPage;
        break;
      case Page.Next:
        this.currentPage++;
        break;
      case Page.Previous:
        this.currentPage--;
        break;
      default:
        this.currentPage = 1;
        break;
    }

    return this.httpClient.get<SearchResult>(`${this.apiURL}/?page=${this.currentPage}` + "&s=" + searchText + "&apikey=" + this.apiKey,
      { observe: 'response' }).pipe(tap(res => {
        var responseData = res["body"];
        this.lastPage=(responseData.totalResults/this.pageSize);
        if(responseData.totalResults%this.pageSize>0){
          this.lastPage++;
        }
      }));
  }
}

