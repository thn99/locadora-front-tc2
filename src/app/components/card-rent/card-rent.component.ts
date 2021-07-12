import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/client.service';
import { Movie } from 'src/app/Movie';
import { Rent } from 'src/app/Rent';
import { RentService } from 'src/app/rent.service';
import { ServiceMovieService } from 'src/app/service-movie.service';

@Component({
  selector: 'app-card-rent',
  templateUrl: './card-rent.component.html',
  styleUrls: ['./card-rent.component.css'],
})
export class CardRentComponent implements OnInit {

  rentList : Rent[];

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
      this.rentList = res;
    });
  }

  loadMovieName(id) {
    this.webMovie.getMovie(id).subscribe((res) => {
      return res.name;
    })
  }

  loadClientName(id) {
    this.webClient.getPerson(id).subscribe((res) => {
      return res.name;
    })
  }

  deleteRent(rent : Rent) {
    this.webRent.deleteRent(rent).subscribe((res) => {
      this.loadRents();
    })
  }

  ngOnInit(): void {
    this.loadRents();
  }
}
