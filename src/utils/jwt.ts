import { useConfigDefault } from '@utils/config';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@customTypes/jwtPayload';

export const createJwtPayload = (email: string): JwtPayload => {
  return { email };
}

export const createJwtToken = (payload: JwtPayload): string => {
  const jwtKey: string = useConfigDefault('jwt.key');
  const jwtExpireIn: number = parseInt(useConfigDefault('jwt.expireIn'));

  console.log('KEY-EXPIREIN', jwtKey, jwtExpireIn);
  return jwt.sign(payload, jwtKey, { expiresIn: jwtExpireIn });
};

export const validateJwtToken = (token: string): boolean => {
  try {
    const jwtKey: string = useConfigDefault('jwt.key');
    jwt.verify(token, jwtKey);
    return true;
  } catch (err) {
    return false;
  }
};
