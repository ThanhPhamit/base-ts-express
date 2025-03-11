import { ConfigApp } from '@/config/constant';
import { CorsException } from '@/config/http-exception';

export const CorsOptions = () => {
  const urlString = ConfigApp.CORS_ALLOWED_ORIGINS;
  let whitelist: string[] = [];
  if (urlString) {
    whitelist = urlString.split(',');
  }

  return {
    credentials: true,
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
    origin: function (origin: string | undefined, callback: (err: Error | null, _allow?: boolean) => void) {
      // For bypassing postman request with no origin
      if (!origin) {
        return callback(null, true);
      }

      if (whitelist.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      return callback(new CorsException());
    },
  };
};
