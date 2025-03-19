import { Component, AfterViewInit, HostListener } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { CvComponent } from './cv/cv.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    AboutMeComponent,
    ContactComponent,
    CvComponent,
    FooterComponent,
    HeroComponent,
    ProjectsComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio-page-nk';

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.handleScroll();
  }

  ngAfterViewInit(): void {
    this.handleScroll();
  }

  private handleScroll(): void {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });

    // Dynamischer Hintergrundwechsel
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percentage = scrollY / maxScroll;

    document.body.style.backgroundColor = `rgb(${30 + percentage * 50}, ${
      42 + percentage * 50
    }, ${56 + percentage * 50})`;
  }
}
