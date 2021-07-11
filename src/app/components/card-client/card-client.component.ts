import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.css'],
})
export class CardClientComponent implements OnInit {
  constructor(private web: ClientService, private router: Router) {}

  peopleList: Client[];
  columns: string[] = [
    'Nome',
    'Sexo',
    'Data de Nascimento',
    'Telefone',
    'Endereço',
    'Atendente?',
    'Ações',
  ];

  getSex(val): string {
    return val == 1 ? 'Masculino' : 'Feminino';
  }

  getFormattedDate(timestamp): string {
    timestamp = Number(timestamp);
    const date = new Date(timestamp);

    return date.toLocaleDateString();
  }

  loadClients() {
    this.web.getAllPeople().subscribe((res) => {
      this.peopleList = res;
    });
  }

  deleteClient(client) {
    this.web.deleteClient(client).subscribe((res) => {
      this.loadClients();
    });
  }

  editClient(client) {
    this.web.updateClient(client).subscribe((res) => {
      this.loadClients();
    });
  }

  getClient(client: Client) {
    this.router.navigate([`main/allClients/${client._id}`], {
      queryParams: {
        name: client.name,
        birth: client.birthDate,
        phone: client.phone,
        adress: client.adress,
      },
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }
}
