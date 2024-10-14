import express, { Response, Request } from 'express';
import { AppDataSource } from './data-source';
import { routes } from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { authenticateJWT } from './middlewares/authMiddleware';
import { authRoutes } from './authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations()

    app.use('/api/auth', authRoutes(AppDataSource));
    app.use('/api', authenticateJWT, routes(AppDataSource));
    app.use(errorMiddleware)
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 404,
        message: `Cannot ${req.method} this url`,
      });
    });


    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Error initializing Data Source:', error));
