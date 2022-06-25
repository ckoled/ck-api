import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import { IRequest } from '../express';
import { deleteSession } from '../services/sessions';

import * as userSvc from '../services/userService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const { ip } = req;
    const userAgent = req.get('user-agent');

    res.status(httpStatus.OK).send('login');
  } catch (e) {
    console.log('Login error');
    next(e);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userSvc.createUser(req.body);
    res.status(httpStatus.OK).json({
      id: newUser!.id,
      username: newUser!.username,
      email: newUser!.email,
    });
  } catch (e) {
    console.log('Login error');
    next(e);
  }
}

export const logout = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    deleteSession(req.user.jti);
    res.status(httpStatus.OK).end();
  } catch (e) {
    console.log('Login error');
    next(e);
  }
}