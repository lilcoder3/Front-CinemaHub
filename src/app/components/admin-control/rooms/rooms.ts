import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarrooms } from './listarrooms/listarrooms';

@Component({
  selector: 'app-rooms',
  imports: [RouterOutlet, Listarrooms],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css'
})
export class Rooms {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
