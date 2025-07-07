import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listareviews } from './listareviews/listareviews';

@Component({
  selector: 'app-review',
  imports: [RouterOutlet,Listareviews],
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class Review implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
