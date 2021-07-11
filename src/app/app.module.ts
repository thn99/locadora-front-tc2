import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

// routing
import { AppRoutingModule } from './app-routing.module';

// material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete'


// import http
import { HttpClientModule } from '@angular/common/http';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ClientFormComponent } from './components/client-form/client-form.component';

// aux
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { PhonePipePipe } from './pipes/phone-pipe.pipe';
import { BirthDatePipePipe } from './pipes/birth-date-pipe.pipe';
import { CardClientComponent } from './components/card-client/card-client.component';
import { LocationFormComponent } from './components/location-form/location-form.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CardMovieComponent,
    MovieFormComponent,
    ClientFormComponent,
    CardClientComponent,
    BirthDatePipePipe,
    PhonePipePipe,
    LocationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
