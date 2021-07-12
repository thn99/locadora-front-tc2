import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardClientComponent } from './components/card-client/card-client.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { LocationFormComponent } from './components/rent-form/location-form.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { CardRentComponent } from './components/card-rent/card-rent.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'allClients',
        component: CardClientComponent,
      },
      {
        path: 'allClients/:id',
        component: ClientFormComponent
      },
      {
        path: 'allMovies',
        component: CardMovieComponent
      },
      {
        path: 'allMovies/:id',
        component: MovieFormComponent
      },
      {
        path: 'registerMovie',
        component: MovieFormComponent,
      },
      {
        path: 'registerClient',
        component: ClientFormComponent
      },
      {
        path: 'locations',
        component: LocationFormComponent
      },
      {
        path: 'locations/all',
        component: CardRentComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
