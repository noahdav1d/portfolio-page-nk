import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CvComponent } from './cv/cv.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true, // AppComponent ist eine Standalone-Komponente
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutMeComponent,
    CvComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio-page-nk';

  ngOnInit() {
    this.loadDarkMode();
  }

  loadDarkMode() {
    const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';
    const body = document.body;
    const darkModeSwitch = document.getElementById(
      'darkModeSwitch'
    ) as HTMLInputElement;

    if (darkModeEnabled) {
      body.classList.add('dark-mode');
      if (darkModeSwitch) {
        darkModeSwitch.checked = true;
      }
    }

    if (darkModeSwitch) {
      darkModeSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem(
          'dark-mode',
          body.classList.contains('dark-mode').toString()
        );
      });
    }
  }
}
