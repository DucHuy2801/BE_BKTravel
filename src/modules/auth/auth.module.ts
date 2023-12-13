import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
