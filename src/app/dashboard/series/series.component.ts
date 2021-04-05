import { Component, OnInit } from '@angular/core';
import { SeriesService } from 'src/app/services/data/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(public seriesService: SeriesService) { }

  ngOnInit(): void {
  }
  onAddSeries(): void {
    this.seriesService.createSeries();
  }
}
