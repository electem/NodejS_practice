// src/config/email.config.ts
export const emailConfig = {
    host: process.env.EMAIL_HOST || 'mail.electems.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || 'raveendra@electems.com',
    pass: process.env.EMAIL_PASS || 'xvF60d5W4#',
    from: process.env.EMAIL_FROM || 'raveendra@electems.com',
  };
