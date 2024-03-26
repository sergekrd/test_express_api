import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] as string;
  if (!authHeader) return res.status(403).json({ auth: false, message: 'No token provided.' });

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ auth: false, message: 'Invalid token format.' });
  }

  const token = tokenParts[1];
  const secret = process.env.JWT_SECRET_KEY
  jwt.verify(token, secret, function (err: any, decoded: any) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    (req as any).userId = decoded.id;
    next();
  });
}

export default verifyToken;
