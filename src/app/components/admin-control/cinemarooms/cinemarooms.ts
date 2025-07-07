import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarcinemarooms } from './listarcinemarooms/listarcinemarooms';

@Component({
  selector: 'app-cinemarooms',
  imports: [RouterOutlet, Listarcinemarooms],
  templateUrl: './cinemarooms.html',
  styleUrl: './cinemarooms.css'
})
export class Cinemarooms {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
