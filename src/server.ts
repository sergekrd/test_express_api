import path from 'path';
import profileRouter from './routes/profile.route';
import usersRouter from './routes/user.route';
import express from 'express';
import logger from './commons/utils/logger';

const app = express();
const host = process.env.HOST
const port = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/', usersRouter);
app.use('/', profileRouter);

const uploadsDirectory = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDirectory));

app.listen(port, () => {
  logger.info(`Server started on http://${host}:${port}`);
});
