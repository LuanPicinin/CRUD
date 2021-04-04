import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })
);
app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || '3333', () => {
    console.info('Server started on port 3333');
  });
}

export default app;
