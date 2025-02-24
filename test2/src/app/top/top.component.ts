import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService, Movies,MoviesResponse } from '../movie-servic.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top',
  providers:[MovieService],
  imports: [CommonModule, FormsModule, RouterLink,AsyncPipe],
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


  constructor(
    private http: HttpClient,
    private movieService: MovieService
  ) { }
  ngOnInit(): void {
    this.getTopMovies();
  }

  getTopMovies(): void {
    this.isLoading = true;
    this.movieService.getTop(this.currentPage).subscribe({
      next: (data) => {
        this.movies = data.items; // items теперь извлекаются из ответа
        this.totalPages = data.totalPages; // totalPages из ответа
        this.getGenres();
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка при получении фильмов:', err);
        this.isLoading = false;
      }
    });
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
