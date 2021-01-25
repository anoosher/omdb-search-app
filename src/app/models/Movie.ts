import { Rating } from "./Rating";

export class Movie {

  constructor() {
    this.Ratings = [];
  }

  Title: string;
  Year: string;
  Plot: string;
  Actors: string;
  Ratings: Rating[];
  Poster: string;
  imdbID: string;
  isDetailed: boolean;
}
