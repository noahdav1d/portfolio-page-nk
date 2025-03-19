import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true, // Falls du Standalone nutzt
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Hier ist der Fix!
})
export class HeaderComponent {}
