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

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.loadGithubStats();
  }

  private loadGithubStats(): void {
    this.githubService.getGithubStats().subscribe({
      next: (stats) => {
        this.githubStats = stats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der GitHub Stats:', error);
        this.isLoading = false;
      },
    });
  }
}
