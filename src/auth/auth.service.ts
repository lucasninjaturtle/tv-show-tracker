import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { SignupInput, LoginInput } from './dto/inputs';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './types/auth-response.types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    private getJwtToken(userId: string) {
        return this.jwtService.sign({ id: userId });
    }

    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        const user = await this.usersService.create(signupInput)

        const token = this.getJwtToken(user.id);

        return { token, user }

    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {

        const { email, password } = loginInput;
        const user = await this.usersService.findOneByEmail(email);

        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestException('Email / Password do not match');
        }

        const token = this.getJwtToken(user.id);

        return {
            token,
            user
        }
    }

    async validateUser(id: string): Promise<User> {

        const user = await this.usersService.findOneById(id);

        if (!user.isActive) {
            throw new UnauthorizedException(`User is inactive, talk with an admin`);
        }

        const plainUser = instanceToPlain(user) as any;
        delete plainUser.password;

        return plainUser;
    }

    revalidateToken(user: User): AuthResponse {

        const token = this.getJwtToken(user.id);

        return { token, user }

    }
}
