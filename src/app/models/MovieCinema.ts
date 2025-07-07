import { CinemaRooms } from "./CinemaRooms";
import { Movies } from "./Movies";

export class MovieCinema {
    id: number = 0
    startinghour: Date = new Date();
    endinghour: Date = new Date();
    cinemarooms_id: CinemaRooms = new CinemaRooms()
    movies_id: Movies = new Movies()
}