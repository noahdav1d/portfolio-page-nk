import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  slides = [
    {
      title: 'Data',
      subtitle: 'Data nerd since day one',
      text: 'Numbers and statistics have been with me since I was a child, I always memorized the number of goals scored by my favourite football players. I discussed numbers and facts with my friends and family members and was always interested in creating value from data.',
      link: '',
      linkText: '',
    },
    {
      title: 'Sports & Adventure',
      subtitle: 'Movement enthusiast and nature explorer',
      text: 'Sport has been a big part of my life for as long as I can remember, be it playing handball at the club, jogging after a hard day`s work or hiking on Sundays. I love all kinds of sports and am always up for an adventure.',
      link: 'https://staywildtravels.com/augstmatthorn-hike/',
      linkText: 'favourite hike',
    },
    {
      title: 'Reading',
      subtitle: 'Quiet minutes with a book',
      text: 'I have been reading books for several years now. I like to immerse myself in fictional stories by great authors like Suzan Collins or Benedict Wells. But I am also always up for reading biographies such as these of Bill Gates, Phil Knight or Lebron James.',
      link: '',
      linkText: '',
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
