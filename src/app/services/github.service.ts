import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import type { Environment } from '../../environments/environment.interface';

export interface GithubStats {
  contributions: GithubContribution[];
  totalContributions: number;
  repositories: number;
  stars: number;
  followers: number;
  topLanguages: Array<{ name: string; percentage: number }>;
  totalStars: number;
  issuesCreated: number;
  pullRequests: number;
  streak: {
    current: number;
    longest: number;
  };
}

export interface GithubContribution {
  count: number;
  date: string;
}

interface GitHubApiResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              date: string;
            }>;
          }>;
        };
      };
    };
  };
}

interface GitHubRepo {
  language: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly graphqlUrl = 'https://api.github.com/graphql';
  private readonly restUrl = 'https://api.github.com';
  private readonly apiUrl = 'https://api.github.com/users/noahdav1d';
  private readonly username = 'noahdav1d';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${(environment as Environment).github.token}`,
      'Accept': 'application/vnd.github.v3+json'
    });
  }

  getGithubStats(): Observable<GithubStats> {
    return forkJoin({
      contributions: this.getContributions(),
      userInfo: this.getUserInfo(),
      languages: this.getLanguageStats(),
    }).pipe(
      map(({ contributions, userInfo, languages }) => ({
        contributions,
        totalContributions: contributions.reduce(
          (sum, day) => sum + day.count,
          0
        ),
        repositories: userInfo.public_repos,
        stars: userInfo.public_gists,
        followers: userInfo.followers,
        topLanguages: languages,
        totalStars: userInfo.public_gists,
        issuesCreated: userInfo.total_private_repos || 0,
        pullRequests: userInfo.collaborators || 0,
        streak: {
          current: this.calculateCurrentStreak(contributions),
          longest: this.calculateLongestStreak(contributions),
        },
      }))
    );
  }

  private calculateCurrentStreak(contributions: GithubContribution[]): number {
    let streak = 0;
    const today = new Date();
    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const contribution of sortedContributions) {
      if (contribution.count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  private calculateLongestStreak(contributions: GithubContribution[]): number {
    let currentStreak = 0;
    let longestStreak = 0;

    for (const contribution of contributions) {
      if (contribution.count > 0) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    return longestStreak;
  }

  private getContributions(): Observable<GithubContribution[]> {
    const query = {
      query: `query {
        user(login: "${this.username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`,
    };

    return this.http
      .post<GitHubApiResponse>(this.graphqlUrl, query, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          const calendar =
            response.data.user.contributionsCollection.contributionCalendar;
          return calendar.weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({
              count: day.contributionCount,
              date: day.date,
            }))
          );
        })
      );
  }

  private getUserInfo(): Observable<any> {
    return this.http.get(`${this.restUrl}/users/${this.username}`, {
      headers: this.headers,
    });
  }

  private getLanguageStats(): Observable<
    Array<{ name: string; percentage: number }>
  > {
    return this.http
      .get<GitHubRepo[]>(`${this.restUrl}/users/${this.username}/repos`, {
        headers: this.headers,
      })
      .pipe(
        map((repos) => {
          const languages = repos.reduce<Record<string, number>>(
            (acc, repo) => {
              if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
              }
              return acc;
            },
            {}
          );

          const total = Object.values(languages).reduce((a, b) => a + b, 0);

          return Object.entries(languages)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / total) * 100),
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);
        })
      );
  }

  private getDetailedStats(): Observable<any> {
    const query = {
      query: `query {
        user(login: "${this.username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                primaryLanguage {
                  name
                }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
          }
          repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              stargazerCount
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`,
    };

    return this.http.post(this.graphqlUrl, query, { headers: this.headers });
  }
}
