import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/client.service';
import { Movie } from 'src/app/Movie';
import { ServiceMovieService } from 'src/app/service-movie.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css'],
})
export class LocationFormComponent implements OnInit {
  movieList: Movie[];
  peopleList: Client[];
  locationForm: FormGroup;

  filteredMovie: Observable<Movie>;
  filteredPeople: Observable<Client[]>;


  constructor(
    private webClient: ClientService,
    private webMovie: ServiceMovieService
  ) {
    
  }

  startForm() {
    this.locationForm = new FormGroup({
      movieName: new FormControl(null, [Validators.required]),
      clientName: new FormControl(null, [Validators.required]),
      withdrawDate: new FormControl(null, [Validators.required]),
      devolutionDate: new FormControl(null, [Validators.required]),
      atendente: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {}

  ngOnInit(): void {
    this.startForm();
  }

  loadClients() {
    this.webClient.getAllPeople().subscribe((res) => {
      this.peopleList = res;
    });
  }

  loadMovies() {
    this.webMovie.getMovies().subscribe((res) => {
      this.movieList = res;
    });
  }
}
