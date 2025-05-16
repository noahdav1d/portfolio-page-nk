import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit, AfterViewInit {
  @ViewChild('skillsChart') private chartRef!: ElementRef;
  private chart: Chart | undefined;

  experiences: Experience[] = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp GmbH',
      period: '2022 - Heute',
      description: [
        'Entwicklung moderner Webanwendungen mit Angular',
        'Implementierung von responsiven Designs',
        'Optimierung der Performance und Benutzerfreundlichkeit',
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Git'],
    },
    // Weitere Erfahrungen hier hinzufügen
  ];

  education: Education[] = [
    {
      degree: 'B.Sc. Informatik',
      institution: 'Hochschule Mannheim',
      period: '2019 - 2022',
      description: 'Schwerpunkt: Webentwicklung und Software Engineering',
    },
    // Weitere Ausbildung hier hinzufügen
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    if (!this.chartRef) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const isDarkMode =
      document.documentElement.classList.contains('dark-theme');
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;

    // Dynamische Anpassung der Schriftgröße und Balkenhöhe
    const getFontSize = () => {
      if (isMobile) return 11;
      if (isTablet) return 12;
      return 14;
    };

    const getBarThickness = () => {
      if (isMobile) return 10;
      if (isTablet) return 12;
      return 15;
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Angular', 'TypeScript', 'HTML/CSS', 'Node.js', 'Git', 'SQL'],
        datasets: [
          {
            data: [85, 80, 90, 70, 85, 75],
            backgroundColor: isDarkMode
              ? 'rgba(66, 135, 245, 0.7)'
              : 'rgba(66, 135, 245, 0.9)',
            borderRadius: isMobile ? 3 : 4,
            maxBarThickness: getBarThickness(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
          padding: {
            left: isMobile ? 0 : isTablet ? 5 : 10,
            right: isMobile ? 0 : isTablet ? 5 : 10,
            top: isMobile ? 5 : 10,
            bottom: isMobile ? 5 : 10,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: isDarkMode ? '#fff' : '#000',
              font: {
                size: getFontSize(),
                weight: 'bold',
              },
              padding: isMobile ? 4 : 8,
              callback: function (value, index, values) {
                const label = this.getLabelForValue(index);
                if (isMobile && label.length > 6) {
                  return label.substring(0, 6) + '..';
                }
                if (isTablet && label.length > 8) {
                  return label.substring(0, 8) + '...';
                }
                return label;
              },
            },
          },
        },
      },
    });

    // Event Listener für Bildschirmgrößenänderungen
    window.addEventListener('resize', () => {
      this.chart?.destroy();
      this.initializeChart();
    });
  }
}
