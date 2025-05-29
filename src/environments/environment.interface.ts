export interface Environment {
  production: boolean;
  githubApiUrl: string;
  recaptcha: {
    siteKey: string;
  };
  emailjs: {
    publicKey: string;
    serviceId: string;
    templateId: string;
  };
  github?: {
    token: string;
    username: string;
  };
}
