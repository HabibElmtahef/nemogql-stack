import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RegisterInput} from './Dto/RegisterInput';
import { User, UserDocument } from './Schemas/user.schema'
import * as bcrypt from 'bcryptjs'
import {JwtService} from '@nestjs/jwt';
import {LoginInput} from './Dto/LoginInput';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {}
    
    async register({ username, email, password }: RegisterInput): Promise<any> {
        try {
            const hashPass = await bcrypt.hash(password, 10)
            const user = await this.userModel.create({
                username,
                email,
                password: hashPass
            })
            return user
        } catch (err) {
            throw new BadRequestException(err.message)
        }
    }

    async login({ email, password }: LoginInput): Promise<any> {
        try {
            const user = await this.userModel.findOne({email})
            
            if(!user) throw new NotFoundException('User Introuvable')

            const correctPass = await bcrypt.compare(password, user.password)

            if(!correctPass) throw new NotFoundException('Password Incorrect')

            const token = this.jwtService.sign({
                id: user._id,
                email: user.email,
                role: user.role
            })

            return {
                user,
                token
            }

        } catch (err) {
            throw new BadRequestException(err.message)
        }
    }

    async me(id: string): Promise<any> {
        const user = await this.userModel.findById(id)
        return user
    }
}
