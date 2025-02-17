import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Для ngModel

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  movies: any[] = []; // Все фильмы
  filteredMovies: any[] = []; // Отфильтрованные фильмы
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  pageInput: number = 1;
  selectedGenre = '';
  sortField: string = ''; // Поле для сортировки (год, рейтинг, место)
  sortOrder: 'asc' | 'desc' = 'asc'; // Направление сортировки

  genres: string[] = []; // Список жанров

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTopMovies();
  }

  getTopMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<any>(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${this.currentPage}`,
        {
          headers: {
            'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          this.totalPages = data.totalPages;
          this.pageInput = this.currentPage;
          this.extractGenres(); // Получаем список жанров
          this.applyFilters(); // Фильтруем и сортируем
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Ошибка загрузки фильмов';
          this.isLoading = false;
          console.error('Ошибка:', err);
        },
      });
  }

  extractGenres(): void {
    const allGenres = new Set<string>();
    this.movies.forEach((movie) => {
      movie.genres.forEach((g: any) => allGenres.add(g.genre));
    });
    this.genres = Array.from(allGenres).sort();
  }

  filterMovies(): void {
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  applyFilters(): void {
    let movies = [...this.movies];

    if (this.selectedGenre) {
      movies = movies.filter((movie) =>
        movie.genres.some((g: any) => g.genre === this.selectedGenre)
      );
    }

    if (this.sortField) {
      movies.sort((a, b) => {
        let valueA: number, valueB: number;

        switch (this.sortField) {
          case 'year':
            valueA = Number(a.year);
            valueB = Number(b.year);
            break;
          case 'rating':
            valueA = a.ratingKinopoisk ? Number(a.ratingKinopoisk) : 0; // Учитываем null
            valueB = b.ratingKinopoisk ? Number(b.ratingKinopoisk) : 0;
            break;
          case 'rank': // Используем `kinopoiskId` как позицию в топе
            valueA = Number(a.kinopoiskId);
            valueB = Number(b.kinopoiskId);
            break;
          default:
            return 0;
        }

        return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }

    this.filteredMovies = movies;
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getTopMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getTopMovies();
    }
  }

  goToPage(): void {
    if (this.pageInput >= 1 && this.pageInput <= this.totalPages) {
      this.currentPage = this.pageInput;
      this.getTopMovies();
    } else {
      alert('Введите корректный номер страницы');
    }
  }
}
