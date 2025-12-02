import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { jwtConstants } from 'src/config/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // validate credentials - returns user without password or null
  async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    // Remove password before returning
    const { password, ...result } = user as any;
    return result;
  }

  async login(user: { email: string }) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: jwtConstants.expiresIn,
    };
  }

  // helper to fetch user by email — used by some controllers if needed
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async validateOAuthUser(oauthData: { email: string; name: string }): Promise<{ user: Partial<User>; access_token: string }> {
    let user = await this.findByEmail(oauthData.email);

    // If user doesn't exist, create a new one
    if (!user) {
      // Use create + save instead of passing object with null
      user = this.userRepo.create({
        email: oauthData.email,
        name: oauthData.name,
        password: undefined, // use undefined instead of null
      });
      user = await this.userRepo.save(user);
    }

    // Remove password before returning
    const { password, ...userWithoutPassword } = user as any;

    // Issue JWT using existing login method
    const tokenData = await this.login({ email: user.email });

    return { user: userWithoutPassword, access_token: tokenData.access_token };
  }


}
