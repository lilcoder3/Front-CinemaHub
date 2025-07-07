import { Component } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';
import { FindMovieScheduleDTO as MovieScheduleModel } from '../../../../models/FindMovieScheduleDTO';

@Component({
  selector: 'app-find-movie-schedule-dto',
  standalone: true,
  templateUrl: './find-movie-schedule-dto.html',
  styleUrls: ['./find-movie-schedule-dto.css'],
  imports: [CommonModule, FormsModule, NgChartsModule],
})
export class FindMovieScheduleDTO {
  cinemaName: string = '';

  // Correct ChartJS v4 typing
  barChartData = {
    labels: [] as string[],
    datasets: [] as ChartDataset<'bar'>[],
  };

  barChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private moviecinemaService: MovieCinemaService) {}

  buscarFunciones() {
    if (!this.cinemaName.trim()) return;

    this.moviecinemaService.getMovieScheduleByCinema(this.cinemaName).subscribe((data: MovieScheduleModel[]) => {
      this.barChartData = {
        labels: data.map((item) => item.movie),
        datasets: [
          {
            data: data.map((item) => parseInt(item.startHour.substring(0, 2))),
            label: 'Hora de Inicio',
            backgroundColor: '#4BACC6',
          },
          {
            data: data.map((item) => parseInt(item.endHour.substring(0, 2))),
            label: 'Hora de Fin',
            backgroundColor: '#C0504D',
          },
        ],
      };
    });
  }
}
