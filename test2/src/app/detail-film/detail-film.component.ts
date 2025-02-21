import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../movie-servic.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-detail-film',
  imports: [AsyncPipe],
  providers: [MovieService],
  templateUrl: './detail-film.component.html',
  styleUrl: './detail-film.component.scss'
})
export class DetailFilmComponent implements OnInit {
  public movie: Movie | null = null;
  public movie$: Observable<Movie> | undefined;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movie$ = this.movieService.getMovie(id)

    }
  }

}
