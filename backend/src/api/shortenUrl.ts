import { Request, Response, NextFunction } from 'express';
import { UrlShortener } from '../storage/UrlShortener';
import { TemporaryStorage } from '../storage/TemporaryStorage';
import { Util, ParamValidationResult } from '../util';

export function ShortenURL(req: Request, res: Response, next: NextFunction): any {
  switch(Util.ValidateApiParam(req.query)) {
    case ParamValidationResult.VALID: {
      const shortener: UrlShortener = new UrlShortener(req.query.url, TemporaryStorage.Instance());
      res.status(200).send(`/${shortener.getShortenedUrl()}`);
      break;
    }
    case ParamValidationResult.INVALID: {
      res.status(422).send('Not Valid URL');
      break;
    }
    case ParamValidationResult.MISSING: {
      // Unprocessable Entity
      res.status(400).send('Bad request : missing parameters');
      break;
    }
    default: {
      res.status(500).send('Internal error');
    }
  }
}