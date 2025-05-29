import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  slides = [
    {
      title: 'My Projects',
      subtitle: '',
      text: "During my Bachelor's degree in Digital Business & AI, I was able to attend many exciting courses and do a lot of work. Here are three of my favorite assignments that I did.",
      link: '',
      linkText: '',
    },
    {
      title: 'NBA Data Analysis',
      subtitle: 'Statistical Analysis with R',
      text: 'The analysis examines whether an NBA team wins more often when it attempts more three-point shots than its opponent. Data from the last 20 seasons and various statistical methods are used. The aim is to find out whether the three-point revolution has actually led to a correlation between the volume of shots and the outcome of the game.',
      link: 'https://github.com/noahdav1d/r-projects-bachelor/blob/main/home_work_noah_kiefer.html',
      linkText: 'View on GitHub',
    },
    {
      title: 'Cluster Analysis',
      subtitle: 'Unsupervised Learning Project',
      text: 'This thesis, part of the SBD3 module, applies unsupervised learning to analyze socioeconomic differences between cities in Kentucky. Cluster analysis is used to examine whether cities can be meaningfully grouped based on certain characteristics such as employment rate and median household income.',
      link: 'https://github.com/noahdav1d/r-projects-bachelor/blob/main/individual_homework_noah_kiefer_html.html',
      linkText: 'View on GitHub',
    },
    {
      title: 'Network Analysis in Movies',
      subtitle: 'Graph Theory Application',
      text: 'I analyze networks of three movies that I have personally seen: 127 Hours, Spider-Man and Wall-E. The goal of this analysis is to better understand the interactions between the characters using network metrics and visualizations. The focus is on properties such as centrality, density, cliques and communities.',
      link: 'https://github.com/noahdav1d/r-projects-bachelor/blob/main/sbd2_homwork_2_noah_kiefer.html',
      linkText: 'View on GitHub',
    },
  ];

  currentSlide = 0;

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
