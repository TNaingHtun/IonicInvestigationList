import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semicircle-progress',
  templateUrl: './semicircle-progress.page.html',
  styleUrls: ['./semicircle-progress.page.scss'],
})
export class SemicircleProgressPage implements OnInit {
  max = 50;
  current=25;
  color="rgba(69, 168, 252,0.5)";
  background="#eaeaea";
  progress = this.current / this.max;
  percent = Math.round(this.progress * 100);
  constructor() { }

  ngOnInit() {
  }

}
