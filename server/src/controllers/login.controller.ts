import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from '../models';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({message: 'Username and password are required.'});

        const foundUser = await User.findOne({username: username}).exec();

        if (!foundUser)
            return res.status(404).json({message: "Sorry, we couldn't find an account associated with this username."});

        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.username,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
            );

            const refreshToken = jwt.sign({username: foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d',
            });

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie('isLoggedIn', true, {
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({accessToken});
        }

        if (!match) {
            res.status(401).json({message: 'Password is incorrect. Please try again!'});
        }
    } catch (error) {
        next(error);
    }
};