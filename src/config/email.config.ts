// src/config/email.config.ts
export const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || 'default_user',
    pass: process.env.EMAIL_PASS || 'default_pass',
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
  };
