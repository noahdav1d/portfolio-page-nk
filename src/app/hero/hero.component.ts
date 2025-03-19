import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true, // Damit es eine Standalone-Komponente ist
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'], // styleUrls mit "s"
})
export class HeroComponent {}
