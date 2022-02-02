import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware } from './helpers/errorHandler';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views/'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/balance', (req, res) => {
  res.render('balance');
});

app.get('/statement', (req, res) => {
  res.render('statement');
});

app.get('/collect', (req, res) => {
  res.render('collect');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

routes(app);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
