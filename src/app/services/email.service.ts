import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

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
    emailjs.init(environment.emailjs.publicKey);
  }

  async sendEmail(formData: EmailForm): Promise<any> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      // Wichtig: Das reCAPTCHA Token muss exakt so übergeben werden
      'g-recaptcha-response': formData.recaptcha,
    };

    console.log('Template Params:', templateParams); // Debugging

    return await emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.templateId,
      templateParams
    );
  }
}
