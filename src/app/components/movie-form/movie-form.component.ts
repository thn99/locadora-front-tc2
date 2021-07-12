import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Movie';
import { ServiceMovieService } from 'src/app/service-movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  movie: Movie = {
    name: undefined,
    description: undefined,
    director: undefined,
    category: undefined,
    releaseDate: undefined,
    available: true,
  };

  categoryList = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'Terror' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Comédia' },
    { id: 6, name: 'Ficção' },
  ];

  constructor(
    private web: ServiceMovieService,
    private route: ActivatedRoute
  ) {}

  isEditing(): boolean {
    if (this.route.snapshot.paramMap.get('id')) {
      return true;
    }
    return false;
  }

  getUrlId(): string {
    if (this.route.snapshot.paramMap.get('id')) {
      return this.route.snapshot.paramMap.get('id');
    }
    return undefined;
  }

  getEditingMovie() {
    this.route.queryParams.subscribe((param) => {
      const name = param['name'];
      const description = param['description'];
      const releaseDate = param['releaseDate'];
      const director = param['director'];

      this.fillEditingForm(name, description, releaseDate, director);
    });
  }

  fillEditingForm(
    name: string,
    description: string,
    releaseDate: string,
    director: string
  ) {
    this.movieForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      releaseDate: new FormControl(releaseDate, [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^\d+$/),
      ]),
      description: new FormControl(description, [Validators.required]),
      director: new FormControl(director, [
        Validators.required,
        Validators.pattern(/\w+/),
      ]),
      category: new FormControl(null, [Validators.required]),
    });
  }

  startForm() {
    this.movieForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      releaseDate: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^\d+$/),
      ]),
      description: new FormControl(null, [Validators.required]),
      director: new FormControl(null, [
        Validators.required,
        Validators.pattern(/\w+/),
      ]),
      category: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.movieForm.valid) {
      this.movie.name = this.movieForm.get('name').value;
      this.movie.releaseDate = this.movieForm.get('releaseDate').value;
      this.movie.description = this.movieForm.get('description').value;
      this.movie.director = this.movieForm.get('director').value;
      this.movie.category = this.movieForm.get('category').value;

      this.web.registerMovie(this.movie).subscribe((res) => {
        if (res.ok) alert('Cadastrado');
        else alert('Erro');
        this.web.getMovies();
      });
    }
  }

  onEdit() {
    if (this.movieForm.valid) {
      this.movie._id = this.getUrlId();
      this.movie.name = this.movieForm.get('name').value;
      this.movie.releaseDate = this.movieForm.get('releaseDate').value;
      this.movie.description = this.movieForm.get('description').value;
      this.movie.director = this.movieForm.get('director').value;
      this.movie.category = this.movieForm.get('category').value;

      this.web.updateMovie(this.movie).subscribe((res) => {
        if (res.ok) alert('Cadastrado');
        else alert('Erro');
        this.web.getMovies();
      });
    }
  }

  ngOnInit(): void {
    if (this.isEditing()) {
      this.getEditingMovie();
    } else {
      this.startForm();
    }
  }
}
