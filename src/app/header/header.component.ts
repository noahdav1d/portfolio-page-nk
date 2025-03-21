import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setupMenuToggle();
    this.setupSmoothScroll();
  }

  private setupMenuToggle(): void {
    const burger = document.querySelector('.burger') as HTMLElement;
    const nav = document.querySelector('nav') as HTMLElement;
    const links = document.querySelectorAll('nav ul li a');

    if (!burger || !nav) return;

    // Menü öffnen/schließen
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Navigation schließen, wenn ein Link geklickt wird
    links.forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  private setupSmoothScroll(): void {
    document.querySelectorAll('nav ul li a').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = (event.target as HTMLAnchorElement)
          .getAttribute('href')
          ?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    });
  }
}
