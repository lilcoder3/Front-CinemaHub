import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarmovies } from './listarmovies/listarmovies';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet,Listarmovies],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
