import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AboutSection {
  title: string;
  introduction: string;
  content: string | string[];
  icon: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  currentIndex = 0;

  sections: AboutSection[] = [
    {
      title: 'Datenvisualisierung & Analytics',
      introduction: 'Daten sind für mich mehr als nur Zahlen und Statistiken. Sie erzählen Geschichten und offenbaren versteckte Zusammenhänge. In meiner täglichen Arbeit nutze ich modernste Tools und Technologien, um aus komplexen Datensätzen wertvolle Erkenntnisse zu gewinnen.',
      content: [
        'Die Macht der Daten fasziniert mich seit meinem ersten SQL-Query.',
        'Mein aktuelles Projekt: Entwicklung eines interaktiven Dashboards für Sportstatistiken.',
        'Mit Power BI & Tableau habe ich bereits mehrere Visualisierungen erstellt.',
        'Machine Learning und KI sind meine neuesten Interessengebiete.',
        'Mein Ziel: Komplexe Daten in verständliche Geschichten übersetzen.',
      ],
      icon: '📊',
    },
    {
      title: 'Sport & Bewegung',
      introduction: 'Sport ist für mich der perfekte Ausgleich zur Arbeit am Computer. Durch regelmäßige Bewegung und sportliche Herausforderungen halte ich Körper und Geist fit. Die Kombination aus Teamsport und individuellen Aktivitäten gibt mir die ideale Balance.',
      content: [
        'Basketball ist mehr als ein Hobby - 8 Jahre aktiv im Verein gespielt.',
        'Meine Lieblings-Wanderroute: Von Grindelwald zum First (4h, 1000hm).',
        'Im Winter findest du mich auf der Skipiste im Berner Oberland.',
        'Jeden Morgen 30min Yoga für einen energiegeladenen Start.',
        'Nächstes Ziel: Teilnahme am Bern City Marathon 2025.',
      ],
      icon: '🏀',
    },
    {
      title: 'Bücher die mich prägen',
      introduction: 'Bücher sind meine wichtigsten Begleiter auf dem Weg der persönlichen und beruflichen Entwicklung. Sie inspirieren mich, erweitern meinen Horizont und helfen mir, neue Perspektiven zu entdecken. Jedes dieser Bücher hat mein Leben auf seine eigene Art bereichert.',
      content: [
        '"Atomic Habits" - Hat meine täglichen Routinen revolutioniert.',
        '"Deep Work" - Dank diesem Buch arbeite ich fokussierter denn je.',
        '"The Psychology of Money" - Veränderte meine Sicht auf Finanzen komplett.',
        '"Digital Minimalism" - Inspirierte mich zu einem bewussteren Tech-Konsum.',
        '"Range" - Bestätigte meinen vielseitigen Entwicklungsansatz.',
      ],
      icon: '📚',
    },
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.sections.length;
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.sections.length) % this.sections.length;
  }

  getContent(content: string | string[]): string[] {
    return Array.isArray(content) ? content : [content];
  }
}
