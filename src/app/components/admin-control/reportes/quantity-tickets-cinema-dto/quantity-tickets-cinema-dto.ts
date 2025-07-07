import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { QuantityTicketsCinemaDTO } from '../../../../models/QuantityTicketsCinemaDTO';
import { FunctionService } from '../../../../services/functions.service';

@Component({
  selector: 'app-quantity-tickets-cinema-dto',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './quantity-tickets-cinema-dto.html',
  styleUrl: './quantity-tickets-cinema-dto.css'
})
export class QuantityTicketsCinemaDTOcomponent implements OnInit {
  barChartLabels: string[] = [];
  barChartData: any;
  barChartType: ChartType = 'bar';

  constructor(private functionsService: FunctionService) {}

  ngOnInit(): void {
    this.functionsService.getQuantityTicketsByCinema().subscribe((data: QuantityTicketsCinemaDTO[]) => {
      this.barChartLabels = data.map(d => d.cinema);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Tickets Vendidos',
            data: data.map(d => d.quantity),
            backgroundColor: '#C0504D',
          },
        ],
      };
    });
  }
}
