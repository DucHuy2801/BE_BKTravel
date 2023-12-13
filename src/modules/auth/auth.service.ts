import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { ErrorException } from 'src/utils/Error';
import { loginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async getTokens(user_id: string, username: string, role_user: string) : Promise<Tokens>{
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    user_id,
                    role_user,
                    username
                }, 
                {
                    secret: 'access_token_secret',
                    expiresIn: 60 * 60 * 24 * 7,
                }
            ),
            this.jwtService.signAsync(
                {
                    user_id,
                    role_user,
                    username
                }, 
                {
                    secret: 'refresh_token_secret',
                    expiresIn: 60 * 60 * 24 * 7,
                }
            )
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async updateRefreshTokenHash(user_id: string, refreshToken: string) {
        const hash = await this.hashData(refreshToken)
        await this.userRepository
            .createQueryBuilder()
            .update(UserEntity)
            .set({ hashedRt: hash})
            .where('user_id = :id', {id: user_id})
            .execute()
    }

    async signup(dto: CreateCustomerDTO) {
        const existUsername = await this.userRepository.findOne({
            where: { username: dto.username }
        })
        if (existUsername) {
            throw new ErrorException(
                "Username is exist!",
                HttpStatus.BAD_REQUEST
            )
        }

        const existEmail = await this.userRepository.findOne({
            where: { email: dto.email }
        })
        if (existEmail) {
            throw new ErrorException(
                "Email is used to register before, welcome use another email!",
                HttpStatus.BAD_REQUEST
            )
        } 

        if (dto.confirm_password !== dto.password) {
            throw new ErrorException(
                "Password doesn't match!",
                HttpStatus.BAD_REQUEST
            )
        }

        const hashPassword = await this.hashData(dto.password)

        const newUser = this.userRepository.create({
            ...dto,
            password: hashPassword,
            role_user: 'customer'
        })

        const result = await this.userRepository.save(newUser)
        const tokens = await this.getTokens(
            result.user_id,
            'customer',
            dto.username,
        )
            
        await this.updateRefreshTokenHash(result.user_id, tokens.refresh_token)
        return {
            message: "Register successfully!"
        }
    }

    async signin(dto: loginDTO) {
        const { username, password } = dto
        const user = await this.userRepository
            .createQueryBuilder()
            .where('username = :username', { username })
            .getOne(); 

        if (!user) throw new ErrorException("Username doesn't exist!", HttpStatus.BAD_REQUEST,)

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) throw new ErrorException('Password is wrong!', HttpStatus.BAD_REQUEST)
    
        const tokens = await this.getTokens(
            user.user_id,
            'customer',
            user.username,
        );

        await this.updateRefreshTokenHash(user.user_id, tokens.refresh_token);
        return tokens;
    }

    async logout(user_id: string) {
        await this.userRepository
            .createQueryBuilder()
            .update(UserEntity)
            .set({ hashedRt: null })
            .where('user_id = :id', { id: user_id })
            .execute();
    }

    async refreshTokens(user_id: string, rt: string) {
        const user = await this.userRepository
            .createQueryBuilder()
            .where('user_id = :id', { id: user_id })
            .getOne();

        if (!user) {
            throw new ErrorException('Not found user!', HttpStatus.BAD_REQUEST)
        }

        const isRtValid = await bcrypt.compare(rt, user.hashedRt)
        if (!isRtValid) throw new ErrorException("Refresh token is invalid!" ,HttpStatus.BAD_REQUEST)

        const tokens = await this.getTokens(
            user.user_id,
            user.role_user,
            user.username
        )
        await this.updateRefreshTokenHash(user.user_id, tokens.refresh_token)
        return tokens
    }
}
