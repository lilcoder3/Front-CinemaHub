import { Movies } from "./Movies";
import { Users } from "./Users";

export class Review {
    id: number = 0;
    reviewdate: Date = new Date(Date.now());
    descriptions: string = "";
    points: number = 0;
    movies_id: Movies = new Movies();
    user_id: Users = new Users();
}