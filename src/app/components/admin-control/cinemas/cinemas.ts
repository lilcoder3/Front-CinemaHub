import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarcinemas } from './listarcinemas/listarcinemas';

@Component({
  selector: 'app-cinemas',
  imports: [RouterOutlet, Listarcinemas],
  templateUrl: './cinemas.html',
  styleUrl: './cinemas.css'
})
export class Cinemas {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
