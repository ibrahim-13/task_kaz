import { Request, Response, NextFunction } from 'express';

// A simple middleware that logs infomation on every request
export function LoggerMiddleware(req: Request, res: Response, next: NextFunction): any {
    console.log(`Requested URL: ${req.url}`);
    // Pass control to the next handler
    next();
}