import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import { logger } from './lib/util';
import api from './api';
import config from './config';
import initializeDb from './db';
import passportMiddleware from './middleware/passport';
import fallback from 'express-history-api-fallback'

const app = express();
const root = path.join(__dirname, '..', 'client', 'dist');

app.server = http.createServer(app);

app.use(express.static(root));
app.use(fallback('index.html', { root }))

app.use(morgan('dev'));
//app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use(cors({origin: "*"}));
app.use(bodyParser.json({ limit : config.bodyLimit }));

initializeDb(() => {
	app.use(passport.initialize());
	
	passportMiddleware(passport);

	app.use('/api', api);
	app.server.listen(process.env.PORT || config.port, () => {
		logger.info(`Started on port ${app.server.address().port}`);
	});
});

export default app;
