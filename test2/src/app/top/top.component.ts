import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-top',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  currentPage = 1;
  totalPages = 1;
  pageInput: number = 1;
  selecetedGenre = '';
  genres: string[] = [];
  filteredMovies: any[] = [];


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getTopMovies();
  }
  getTopMovies(): void {
    this.http.get<any>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${this.currentPage}`,
      {
        headers: {
          'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          console.log(data.items)
          this.totalPages = data.totalPages;
          this.isLoading = false;
          console.log();
          this.getGenres();
          this.applyFilters()
          console.log(this.genres);
        }

      })
  }

  getGenres(): void {
    const allGenres = new Set<string>();
    this.movies.forEach((movie) => {
      movie.genres.forEach((g: any) => allGenres.add(g.genre));
    })
    this.genres = Array.from(allGenres);
  }
  filterMovies(): void {
    this.applyFilters();
  }
  applyFilters(): void {
    let movies = [...this.movies];
    if (this.selecetedGenre) {
      movies = movies.filter((movie) =>
        movie.genres.some((g: any) => g.genre === this.selecetedGenre));
      this.filteredMovies = movies;
    } else {
      this.filteredMovies = this.movies
    }

  }


  // Функции для пагинации
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageInput++;
      this.pageInput = this.currentPage
      this.getTopMovies();
    }

  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageInput--;
      this.pageInput = this.currentPage
      this.getTopMovies();
    }
  }

  goToPage(): void {
    if (this.pageInput >= 1 && this.pageInput <= this.totalPages) {
      this.currentPage = this.pageInput;

      this.getTopMovies();
    }

  }

}
