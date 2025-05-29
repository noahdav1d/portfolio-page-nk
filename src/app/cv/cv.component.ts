import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements AfterViewInit {
  @ViewChild('skillsChart') chartRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    // Ermittle die Bildschirmbreite
    const isMobile = window.innerWidth < 768;

    const fontSize = isMobile ? 11 : 15; // Kleinere Schrift auf Mobilgeräten
    const labelSize = isMobile ? 9 : 13;

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const darkMode =
      document.body.classList.contains('dark-mode') || prefersDark;

    const textColor = darkMode ? '#fff' : '#222';
    const barColor = darkMode
      ? 'rgba(66, 135, 245, 0.85)'
      : 'rgba(66, 135, 245, 0.9)';
    const gridColor = darkMode ? '#444' : '#eee';

    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Power BI',
          'R',
          'Python',
          'Tableau',
          'Project Management',
          'SQL',
          'Git',
          'Power Platform',
        ],
        datasets: [
          {
            data: [80, 85, 70, 60, 85, 70, 75, 80],
            backgroundColor: barColor,
            borderRadius: 6,
            maxBarThickness: 22,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
          padding: 10,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: darkMode ? '#222' : '#fff',
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor,
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: { size: labelSize }, // Responsive Schriftgröße
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              font: {
                size: fontSize, // Responsive Schriftgröße
                weight: 'bold',
              },
              padding: isMobile ? 4 : 8, // Angepasstes Padding für Mobile
            },
          },
        },
      },
    });
  }

  private createChart(): void {
    const options = {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#000000', // Schwarze Schrift
            font: {
              size: 10, // Kleinere Schriftgröße
            },
          },
          pointLabels: {
            color: '#000000', // Schwarze Schrift für Labels
            font: {
              size: 11, // Kleinere Schriftgröße für Labels
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#000000', // Schwarze Schrift für Legende
            font: {
              size: 12, // Kleinere Schriftgröße für Legende
            },
          },
        },
      },
    };
  }

  // Event-Listener für Größenänderungen hinzufügen
  @HostListener('window:resize')
  onResize() {
    // Chart bei Größenänderung neu erstellen
    if (this.chartRef) {
      this.ngAfterViewInit();
    }
  }
}
