import { Request, Response, NextFunction } from 'express';
import { UrlShortener } from '../storage/UrlShortener';
import { TemporaryStorage } from '../storage/TemporaryStorage';
import { Util } from '../util';

export function UrlRedirection(req: Request, res: Response, next: NextFunction) {
  const shortener = new UrlShortener(req.url, TemporaryStorage.Instance());
  const url = shortener.getOriginalUrl();
  if (url) {
    res.redirect(302, Util.prependHttp(url));
  } else {
    next();
  }
}