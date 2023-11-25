import express from 'express';
import cors from 'cors';
import winston from 'winston';
import config from './config';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const port = config.APP_PORT;

const app = express();

app.use(cors());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // adds a timestamp property
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
