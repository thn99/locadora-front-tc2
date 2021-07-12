import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/client.service';
import { Movie } from 'src/app/Movie';
import { Info, Rent } from 'src/app/Rent';
import { RentService } from 'src/app/rent.service';
import { ServiceMovieService } from 'src/app/service-movie.service';

@Component({
  selector: 'app-card-rent',
  templateUrl: './card-rent.component.html',
  styleUrls: ['./card-rent.component.css'],
})
export class CardRentComponent implements OnInit {
  rentList: Info[] = [];
  movie: Movie;

  columns: string[] = [
    'Cliente',
    'Filme',
    'Atendido por',
    'Empréstimo',
    'Término',
  ];

  constructor(
    private webMovie: ServiceMovieService,
    private webClient: ClientService,
    private webRent: RentService
  ) {}

  loadRents() {
    this.webRent.getRents().subscribe((res) => {
      res.forEach((rents) => {
        const rent = rents;
        forkJoin({
          movie: this.webMovie.getMovie(rents.movieId),
          client: this.webClient.getPerson(rents.clienteId),
          atendente: this.webClient.getPerson(rents.atendenteId),
        }).subscribe((res) => {
          this.rentList.push({
            movie: res.movie,
            client: res.client,
            atendente: res.atendente,
            rent: rent,
          });
        });
      });
    });
  }

  loadMovieName(id) {
    this.webMovie.getMovie(id).subscribe((res) => {
      this.movie.name = res.name;
    });
  }

  loadClientName(id) {
    this.webClient.getPerson(id).subscribe((res) => {
      return res.name;
    });
  }

  deleteRent(rent: Rent) {
    forkJoin({
      rent: this.webRent.deleteRent(rent._id),
      movie: this.webMovie.setAvailable(rent.movieId),
    }).subscribe((res) => {
      this.rentList = [];
      this.loadRents();
    });
  }

  getFormattedDate(timestamp): string {
    timestamp = Number(timestamp);
    const date = new Date(timestamp);

    return date.toLocaleDateString();
  }

  ngOnInit(): void {
    this.loadRents();
  }
}
