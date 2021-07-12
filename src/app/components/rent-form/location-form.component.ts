import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/services/client.service';
import { Movie } from 'src/app/Movie';
import { ServiceMovieService } from 'src/app/services/service-movie.service';
import { map, startWith } from 'rxjs/operators';
import { Rent } from 'src/app/Rent';
import { BirthDatePipePipe } from 'src/app/pipes/birth-date-pipe.pipe';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css'],
})
export class LocationFormComponent implements OnInit {
  movieList: Movie[];
  peopleList: Client[];
  attendantList: Client[];
  rent: Rent = {
    movieId: undefined,
    clienteId: undefined,
    atendenteId: undefined,
    stardDate: undefined,
    endDate: undefined,
  };
  rentForm: FormGroup;
  birthPipe: BirthDatePipePipe = new BirthDatePipePipe();

  constructor(
    private webClient: ClientService,
    private webMovie: ServiceMovieService,
    private webRent: RentService
  ) {}

  startForm() {
    this.rentForm = new FormGroup({
      movieName: new FormControl(null, [Validators.required]),
      clientName: new FormControl(null, [Validators.required]),
      withdrawDate: new FormControl(null, [Validators.required]),
      devolutionDate: new FormControl(null, [Validators.required]),
      atendente: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.rentForm.valid) {
      const startDate = this.birthPipe.transform(
        this.rentForm.get('withdrawDate').value
      );
      const endDate = this.birthPipe.transform(
        this.rentForm.get('devolutionDate').value
      );

      const startDateSplit: string[] = startDate.split('/');
      const endDateSplit: string[] = endDate.split('/');

      const startDateTimestamp = new Date(
        `${startDateSplit[1]}-${startDateSplit[0]}-${startDateSplit[2]}`
      );
      const endDateTimestamp = new Date(
        `${endDateSplit[1]}-${endDateSplit[0]}-${endDateSplit[2]}`
      );

      this.rent.movieId = this.rentForm.get('movieName').value;
      this.rent.clienteId = this.rentForm.get('clientName').value;
      this.rent.atendenteId = this.rentForm.get('atendente').value;
      this.rent.stardDate = startDateTimestamp.getTime();
      this.rent.endDate = endDateTimestamp.getTime();

      this.webRent.createRent(this.rent).subscribe((res) => {
        if (res.ok) alert('Sucesso');
        else alert('Erro');
      });
    }
  }

  ngOnInit(): void {
    this.startForm();
    this.loadAvailableMovies();
    this.loadAttendantsOnly();
    this.loadClientsOnly();
  }

  loadAttendantsOnly() {
    this.webClient.getAllPeople().subscribe((res) => {
      const onlyAttendants = res.filter((p) => {
        return p.isAtendente == true;
      });
      this.attendantList = onlyAttendants;
    });
  }

  loadClientsOnly() {
    this.webClient.getAllPeople().subscribe((res) => {
      const onlyClients = res.filter((p) => {
        return p.isAtendente == false;
      });
      this.peopleList = onlyClients;
    });
  }

  loadAvailableMovies() {
    this.webMovie.getMovies().subscribe((res) => {
      const availableMovies = res.filter((m) => {
        return m.available == true;
      });
      this.movieList = availableMovies;
    });
  }
}
