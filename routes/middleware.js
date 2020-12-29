import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

export default (req, res, next) => {
  const { authorization } = req.headers;

  let token;
  if (!authorization)
    return res.status(401).send({ message: 'Unauthorized', errorCode: 401 })

  if (!authorization.startsWith('Bearer '))
    return res.status(401).send({ message: 'Unauthorized', errorCode: 401 })

  token = authorization.slice(7, authorization.length);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.message === 'jwt expired')
        return res.status(401).send({ message: 'Unauthorized - invalid session', errorCode: 401 });

      return res.status(401).send({ message: 'Unauthorized', errorCode: 401 });
    }
    else {
      req.id = decoded.id;
      return next();
    }
  });
};