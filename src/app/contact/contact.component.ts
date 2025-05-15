import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  siteKey = environment.recaptcha.siteKey;
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private emailService: EmailService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required],
    });
  }

  onRecaptchaResolved(token: string | null): void {
    console.log('reCAPTCHA Token:', token); // Debugging
    if (token) {
      this.contactForm.patchValue({ recaptcha: token });
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    // Ausblenden nach 3 Sekunden
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      try {
        const formData = {
          name: this.contactForm.get('name')?.value || '',
          email: this.contactForm.get('email')?.value || '',
          message: this.contactForm.get('message')?.value || '',
          recaptcha: this.contactForm.get('recaptcha')?.value,
        };

        await this.emailService.sendEmail(formData);
        this.showMessage('Nachricht erfolgreich gesendet!', 'success');
        this.contactForm.reset();
      } catch (error) {
        console.error('Fehler beim Senden:', error);
        this.showMessage('Fehler beim Senden der Nachricht.', 'error');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
