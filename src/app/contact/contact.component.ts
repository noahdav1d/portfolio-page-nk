import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import type { Environment } from '../../environments/environment.interface';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey, // Verwende Environment-Variable
      } as RecaptchaSettings,
    },
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  siteKey = environment.recaptcha.siteKey;
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    // Initialisiere das Formular im Constructor
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.siteKey = (environment as Environment).recaptcha.siteKey;
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required],
    });
  }

  onRecaptchaResolved(event: string | null): void {
    if (event) {
      // Handle resolved captcha
      console.log('Captcha resolved:', event);
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
          name: this.contactForm.get('name')?.value ?? '',
          email: this.contactForm.get('email')?.value ?? '',
          message: this.contactForm.get('message')?.value ?? '',
          recaptcha: this.contactForm.get('recaptcha')?.value ?? '',
        };

        await this.emailService.sendEmail(formData);
        this.showMessage('Message sent successfully!', 'success');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending message:', error);
        this.showMessage('Error sending message.', 'error');
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  // Debug-Hilfsfunktion
  logFormStatus() {
    console.log('Form Status:', {
      valid: this.contactForm.valid,
      errors: {
        name: this.contactForm.get('name')?.errors,
        email: this.contactForm.get('email')?.errors,
        message: this.contactForm.get('message')?.errors,
        recaptcha: this.contactForm.get('recaptcha')?.errors,
      },
    });
  }
}
