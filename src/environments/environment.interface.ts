export interface Environment {
  production: boolean;
  githubApiUrl: string;
  recaptcha: {
    siteKey: string;
    secretKey: string;
  };
  github: {
    token: string;
  };
  emailjs: {
    publicKey: string;
    serviceId: string;
    templateId: string;
  };
}