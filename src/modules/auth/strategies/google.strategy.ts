// src/modules/auth/strategies/google.strategy.ts

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  // Create a logger specific to this class
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      // Google OAuth credentials from .env
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // Google will redirect to this URL after login
      callbackURL: process.env.GOOGLE_CALLBACK_URL,

      // These are the permissions/data we request from Google
      scope: ['email', 'profile'],
    });

    this.logger.log('Google OAuth Strategy initialized');
  }

  /**
   * This function runs automatically when Google successfully authenticates the user.
   * It receives Google's returned user profile + tokens.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    this.logger.log('Validating Google user profile');

    // Google provides user details in the "profile" object
    const { name, emails } = profile;

    this.logger.debug(`Received Google user email: ${emails[0].value}`);
    this.logger.debug(`Received Google user name: ${name.givenName} ${name.familyName}`);

    // Call your AuthService to validate or create the user inside your DB
    const user = await this.authService.validateOAuthUser({
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
    });

    // Pass the final user object back into the request
    done(null, user);
  }
}
