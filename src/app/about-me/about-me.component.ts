import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'], // <-- Hier "styleUrls" statt "styleUrl"
})
export class AboutMeComponent {}
