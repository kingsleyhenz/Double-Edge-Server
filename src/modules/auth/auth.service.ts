import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';
import { RegisterDto, LoginDto } from './auth.dto';

class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
  private readonly saltRounds = 10;

  public async register(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user.id, user.role);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  public async login(email: string, pass: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.role);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  private generateToken(userId: string, role?: string | null): string {
    return jwt.sign({ userId, role }, this.jwtSecret, { expiresIn: '7d' });
  }
}

export default AuthService;
