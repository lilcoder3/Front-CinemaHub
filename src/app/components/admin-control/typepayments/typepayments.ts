import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listartypepayments } from './listartypepayments/listartypepayments';

@Component({
  selector: 'app-typepayments',
  imports: [RouterOutlet,Listartypepayments],
  templateUrl: './typepayments.html',
  styleUrl: './typepayments.css'
})
export class Typepayments implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
