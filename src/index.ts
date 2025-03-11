import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import i18next from 'i18next';
import i18httpMiddleware from 'i18next-http-middleware';
import fsBackend from 'i18next-fs-backend';
import { routes } from '@/routes';
import { AppDataSource } from '@/config/database';
import { ConfigApp } from '@/config/constant';
import { CorsOptions } from '@/config/cors';
import { i18nextOptions } from '@/config/i18next';
import { errorHandleMiddleware } from '@/middlewares/error-handle.middleware';
import { error404HandleMiddleware } from '@/middlewares/404-handle.middleware';
import { languageMiddleware } from '@/middlewares/language.middleware';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));

const app: Express = express();
const port = ConfigApp.PORT;

// CORS
app.use(cors(CorsOptions()));
app.disable('x-powered-by');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize i18next middleware
i18next.use(fsBackend).use(i18httpMiddleware.LanguageDetector).init(i18nextOptions);
app.use(i18httpMiddleware.handle(i18next));

// Language middleware
app.use(languageMiddleware);

app.use('/v1/api/', routes);

// Error handling middleware
app.use(errorHandleMiddleware);

// 404 handler
app.use(error404HandleMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
