import { Component } from '@angular/core';
import { ReviewService } from '../../../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-get-movie-review-dto',
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './get-movie-review-dto.html',
  styleUrl: './get-movie-review-dto.css'
})
export class GetMovieReviewDTO {
movieName: string = '';
  chartLabels: string[] = [];
  chartData: any = {
    labels: [],
    datasets: []
  };
  chartType: ChartType = 'bar';

  constructor(private reviewService: ReviewService) {}

  buscarResenas() {
    if (!this.movieName.trim()) return;

    this.reviewService.getStatsByMovieName(this.movieName).subscribe((data) => {
      this.chartLabels = data.map(item => item.movie);
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Cantidad de Reseñas',
            data: data.map(item => item.totalReviews),
            backgroundColor: '#4BACC6'
          },
          {
            label: 'Promedio de Puntuación',
            data: data.map(item => item.averageRating),
            backgroundColor: '#C0504D'
          }
        ]
      };
    });
  }
}
