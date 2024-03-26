import profileRouter from './routes/profile.route';
import usersRouter from './routes/user.route';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRouter);
app.use('/', profileRouter);


app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
