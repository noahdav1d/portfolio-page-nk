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
      title: 'Meine Reise',
      subtitle: 'Wie alles begann',
      text: 'Schon früh begeisterte ich mich für Technik und Programmierung. Mein Weg führte mich von ersten Webseiten bis hin zu modernen Webanwendungen.',
      link: '',
      linkText: '',
    },
    {
      title: 'Meine Werte',
      subtitle: 'Was mir wichtig ist',
      text: 'Qualität, Kreativität und stetige Weiterentwicklung stehen für mich im Mittelpunkt. Ich liebe es, innovative Lösungen zu finden.',
      link: '',
      linkText: '',
    },
    {
      title: 'Let’s connect!',
      subtitle: '',
      text: 'Du möchtest mehr erfahren oder gemeinsam etwas starten? Ich freue mich auf deine Nachricht!',
      link: 'mailto:deine@email.de',
      linkText: 'Kontakt aufnehmen',
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
