import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GithubStats } from '../services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  githubStats: GithubStats = {
    contributions: [],
    totalContributions: 0,
    repositories: 0,
    stars: 0,
    followers: 0,
    topLanguages: [],
    totalStars: 0,
    issuesCreated: 0,
    pullRequests: 0,
    streak: {
      current: 0,
      longest: 0,
    },
  };
  isLoading = true;

  // Carousel Properties
  currentSlide = 0;
  touchStartX = 0;
  touchEndX = 0;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.loadGithubStats();
  }

  private loadGithubStats(): void {
    this.githubService.getGithubStats().subscribe(
      (stats) => {
        this.githubStats = stats;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading GitHub stats:', error);
        this.isLoading = false;
      }
    );
  }

  // Carousel Methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % 4;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? 3 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Touch Events für Mobile Swipe
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
  }
}
