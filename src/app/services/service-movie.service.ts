import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root',
})
export class ServiceMovieService {
  endpointUrl = 'https://tc2-locadora-backend.glitch.me/api';

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.endpointUrl + '/filmes');
  }

  getMovie(id): Observable<Movie> {
    return this.http.get<Movie>(this.endpointUrl + '/filmes/filme/' + id);
  }

  registerMovie(movie): Observable<any> {
    let body = new HttpParams();
    body = body.set('name', movie.name);
    body = body.set('description', movie.description);
    body = body.set('releaseDate', movie.releaseDate);
    body = body.set('category', movie.category);
    body = body.set('director', movie.director);
    body = body.set('available', 'true');
    return this.http.post(this.endpointUrl + '/filmes', body, {
      observe: 'response',
    });
  }

  updateMovie(movie): Observable<any> {
    let body = new HttpParams();
    body = body.set('name', movie.name);
    body = body.set('description', movie.description);
    body = body.set('releaseDate', movie.releaseDate);
    body = body.set('category', movie.category);
    body = body.set('director', movie.director);
    body = body.set('available', movie.available);
    return this.http.put(this.endpointUrl + '/filmes/' + movie._id, body, {
      observe: 'response',
    });
  }

  setAvailable(id): Observable<any> {
    let body = new HttpParams();
    body = body.set('available', 'true');
    return this.http.put(this.endpointUrl + '/filmes/' + id, body, {
      observe: 'response',
    });
  }

  deleteMovie(movie): Observable<any> {
    return this.http.delete(this.endpointUrl + '/filmes/' + movie._id);
  }

  constructor(private http: HttpClient) {}
}
