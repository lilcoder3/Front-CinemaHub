import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarcities } from './listarcities/listarcities';

@Component({
  selector: 'app-cities',
  imports: [RouterOutlet, Listarcities],
  templateUrl: './cities.html',
  styleUrl: './cities.css'
})
export class Cities {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
