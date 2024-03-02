import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import session from 'express-session';
import orderRoutes from './routes/orderRoutes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use('/users', userRoutes);
app.use('/',homeRoutes);
app.use('/',orderRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



