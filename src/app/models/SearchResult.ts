import { Movie } from "./Movie";

export class SearchResult {

    constructor(){
        this.Search = [];
    }

    Search: Movie[];
    totalResults: number;
    Response: boolean;
    Error:string;
}
