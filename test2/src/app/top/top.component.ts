import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top',
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getTopMovies();
  }
  getTopMovies(): void {
    this.http.get<any>('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1',
      {
        headers: {
          'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          console.log(this.movies)
        }

      })
  }

}
