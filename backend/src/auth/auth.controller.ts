import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    console.log('Intento de login con email:', loginDto.email);
    
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (user) {
      console.log('Login exitoso para usuario:', user.email, 'con rol:', user.rol);
    } else {
      console.log('Login fallido - Credenciales inválidas para:', loginDto.email);
    }
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}