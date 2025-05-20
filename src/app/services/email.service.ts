import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import type { Environment } from '../../environments/environment.interface';

interface EmailForm {
  name: string;
  email: string;
  message: string;
  recaptcha: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {
    emailjs.init((environment as Environment).emailjs.publicKey);
  }

  async sendEmail(formData: EmailForm): Promise<any> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      'g-recaptcha-response': formData.recaptcha,
    };

    console.log('Template Params:', templateParams); // Debugging

    return await emailjs.send(
      (environment as Environment).emailjs.serviceId,
      (environment as Environment).emailjs.templateId,
      templateParams
    );
  }
}
