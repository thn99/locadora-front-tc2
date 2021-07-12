import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Movie';
import { ServiceMovieService } from '../../services/service-movie.service';
import { CategoryList } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css'],
})
export class CardMovieComponent implements OnInit {
  movieList: Movie[];
  columns: string[] = [
    'Nome',
    'Categoria',
    'Lançamento',
    'Diretor',
    'Disponibilidade',
    'Ações',
  ];

  constructor(private web: ServiceMovieService, private router: Router) {}

  getCategory(categoryNumber): string {
    return CategoryList.find((cat) => cat.id == categoryNumber).name;
  }

  loadMovies() {
    this.web.getMovies().subscribe((res) => {
      this.movieList = res;
    });
  }

  deleteMovie(movie) {
    this.web.deleteMovie(movie).subscribe((res) => {
      this.loadMovies();
    });
  }

  editMovie(movie) {
    this.web.updateMovie(movie).subscribe((res) => {
      this.loadMovies();
    });
  }

  getMovie(movie: Movie) {
    this.router.navigate([`main/allMovies/${movie._id}`], {
      queryParams: {
        name: movie.name,
        description: movie.description,
        director: movie.director,
        releaseDate: movie.releaseDate,
      },
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }
}
