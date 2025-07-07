import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FindMovieScheduleDTO } from './find-movie-schedule-dto/find-movie-schedule-dto';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet, FindMovieScheduleDTO],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes implements OnInit {
  constructor (public route: ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
