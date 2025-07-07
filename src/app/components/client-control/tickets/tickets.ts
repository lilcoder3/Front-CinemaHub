import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTickets } from './listartickets/listartickets';

@Component({
  selector: 'app-tickets',
  imports: [RouterOutlet,ListarTickets],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}