import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';
import { QuantityMoviesCityDTO } from '../../../../models/QuantityMoviesCityDTO';

@Component({
  selector: 'app-quantity-movies-city-dto',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './quantity-movies-city-dto.html',
  styleUrl: './quantity-movies-city-dto.css'
})
export class QuantityMoviesCityDTOcomponent implements OnInit {
  barChartLabels: string[] = [];
  barChartData: any;
  barChartType: ChartType = 'bar';

  constructor(private movieCinemaService: MovieCinemaService) {}

  ngOnInit(): void {
    this.movieCinemaService.getQuantityMoviesByCity().subscribe((data: QuantityMoviesCityDTO[]) => {
      this.barChartLabels = data.map(d => d.city);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Películas por Ciudad',
            data: data.map(d => d.quantity),
            backgroundColor: '#4F81BC',
          },
        ],
      };
    });
  }
}
