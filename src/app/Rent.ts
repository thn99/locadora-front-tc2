import { Client } from "./Client";
import { Movie } from "./Movie";

export interface Rent {
  _id?: string,
  movieId: string;
  clienteId: string;
  atendenteId: string;
  stardDate: number;
  endDate: number;
}

export interface Info {
  rent: Rent,
  movie: Movie,
  client: Client,
  atendente: Client,
}
