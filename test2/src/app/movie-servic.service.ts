import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Movie = {
  nameRu: string;
  logoUrl: string;
}
export type Movies = {
  nameRu: string;
  logoUrl: string;
  genres: { genre: string }[];
  posterUrlPreview: string;
  kinopoiskId:string;
}[]


export type MoviesResponse = {
  items: Movies;
  totalPages: number;
};

@Injectable()
export class MovieService {
  private readonly movieUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
  private readonly movieUrlTop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=';
  private readonly httpClient = inject(HttpClient);
  public getMovie(id:string): Observable<Movie>{
    return this.httpClient.get<Movie>(`${this.movieUrl}${id}`,
      {
        headers: {
          'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
          'Content-Type': 'application/json',
        },
      })
  }
  public getTop(id: number): Observable<MoviesResponse> {
    return this.httpClient.get<MoviesResponse>(`${this.movieUrlTop}${id}`, {
      headers: {
        'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
        'Content-Type': 'application/json',
      },
    });
  }
}
