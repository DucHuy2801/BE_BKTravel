import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { loginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: CreateCustomerDTO) {
        return this.authService.signup(dto)
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: loginDTO) {
        return this.authService.signin(dto)
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Post('/logout')
    // @HttpCode(HttpStatus.OK)
    // logout(@Req() req: Request) {
    //     const user = req?.body;
    //     return this.authService.logout(user['user_id'])
    // }
}
