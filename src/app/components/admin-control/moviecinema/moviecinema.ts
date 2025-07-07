import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarmoviecinema } from './listarmoviecinema/listarmoviecinema';

@Component({
  selector: 'app-moviecinema',
  imports: [RouterOutlet, Listarmoviecinema],
  templateUrl: './moviecinema.html',
  styleUrl: './moviecinema.css'
})
export class Moviecinema {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
