import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FunctionService } from '../../../../services/functions.service';
import { CommonModule } from '@angular/common';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';

@Component({
  selector: 'app-quantity-functions-cinema-dto',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './quantity-functions-cinema-dto.html',
  styleUrl: './quantity-functions-cinema-dto.css'
})
export class QuantityFunctionsCinemaDTO {
  chartLabels: string[] = [];
  chartData: any;
  chartType: ChartType = 'bar';

  constructor(private ms: MovieCinemaService) {}

  ngOnInit(): void {
    this.ms.getQuantityFunctionsByCinema().subscribe((data) => {
      this.chartLabels = data.map(d => d.cinema);
      this.chartData = {
        labels: this.chartLabels,
        datasets: [{
          label: 'Cantidad de Funciones',
          data: data.map(d => d.quantity),
          backgroundColor: '#4BACC6'
        }]
      };
    });
  }
}
