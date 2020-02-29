import * as express from 'express';
import { createServer, Server } from 'http';
import * as cors from 'cors';
import { LoggerMiddleware } from './middleware/requestLog';
import { ShortenURL } from './api/shortenUrl';
import { GlobalConfig } from './config';
import { Util } from './util';
import { OriginalURL } from './api/originalUrl';
import { UrlRedirection } from './api/redirection';

const ExpressApp: express.Express = express();
const HttpServer: Server = createServer(ExpressApp);

// Enable CORS for API
ExpressApp.use(cors());

// Enable logging
ExpressApp.use(LoggerMiddleware);

// Serve static files
ExpressApp.use(express.static(GlobalConfig.STATIC_DIR));

ExpressApp.get(GlobalConfig.PATH_SHORTEN, ShortenURL);
ExpressApp.get(GlobalConfig.PATH_ORIGINAL, OriginalURL);
ExpressApp.get(Util.GetRedirectUrlPath(), UrlRedirection);

// Handle any error
ExpressApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Show 404 message path doesn't exist
ExpressApp.use((req, res, next) => {
  res.status(400).send('The page you are looking for does not exist');
});


// Start the server
HttpServer.listen(
  GlobalConfig.PORT, GlobalConfig.IP_ADDR,
  () => console.log(`Listening on ${GlobalConfig.IP_ADDR}:${GlobalConfig.PORT}`)
);