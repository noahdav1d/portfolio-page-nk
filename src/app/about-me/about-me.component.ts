import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  selected?: string;
}

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AboutMeComponent {
  showResults = false;
  correctAnswers = 0;

  questions: Question[] = [
    {
      text: 'What is my favorite programming language?',
      options: ['JavaScript', 'Python', 'Java', 'TypeScript'],
      correctAnswer: 'TypeScript',
    },
    {
      text: 'Where am I from?',
      options: ['Germany', 'Austria', 'Switzerland', 'Liechtenstein'],
      correctAnswer: 'Switzerland',
    },
    {
      text: 'What is my preferred development framework?',
      options: ['React', 'Angular', 'Vue', 'Svelte'],
      correctAnswer: 'Angular',
    },
    {
      text: 'Which hobby is NOT one of mine?',
      options: ['Hiking', 'Photography', 'Gaming', 'Surfing'],
      correctAnswer: 'Surfing',
    },
  ];

  selectAnswer(questionIndex: number, option: string) {
    if (!this.showResults) {
      this.questions[questionIndex].selected = option;
    }
  }

  canCheckAnswers(): boolean {
    return this.questions.every((q) => q.selected !== undefined);
  }

  checkAnswers() {
    this.showResults = true;
    this.correctAnswers = this.questions.filter(
      (q) => q.selected === q.correctAnswer
    ).length;
  }
}
