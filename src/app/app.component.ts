import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Locadora';
  CategoryList = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'Terror' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Comédia' },
    { id: 6, name: 'Ficção' },
  ];
}
