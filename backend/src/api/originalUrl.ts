import { Request, Response, NextFunction } from 'express';
import { UrlShortener } from '../storage/UrlShortener';
import { TemporaryStorage } from '../storage/TemporaryStorage';

export function OriginalURL(req: Request, res: Response, next: NextFunction): any {
  // For the primary objective, we can't validate localhost as a valid host because of
  // the RegExp (which is follows simple pattern) used for validation
  if (req.query.url) {
    const shortener = new UrlShortener(req.query.url, TemporaryStorage.Instance());
    const orgUrl = shortener.getOriginalUrl();
    if (orgUrl === undefined) {
      res.status(404).send('Not found');
    } else {
      res.status(200).send(orgUrl);
    }
  } else {
    res.status(400).send('Bad request : missing parameters');
  }
}