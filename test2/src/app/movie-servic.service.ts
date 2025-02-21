import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Movie = {
  nameRu: string;
  logoUrl: string;
}

@Injectable()
export class MovieService {
  private readonly movieUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
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
}
