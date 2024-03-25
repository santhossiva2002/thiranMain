const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();


const { MONGO_URL, PORT } = process.env;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.set('view engine', 'ejs');
     app.set('views', path.join(__dirname, 'Views'));
    app.use(express.static('Public'));

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 1000, // 30 minutes (adjust as needed)
        httpOnly: true // Ensures cookies are only accessible via HTTP(S) and not client-side scripts
      }
    }));
    app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.setHeader('Expires', '-1');
      res.setHeader('Pragma', 'no-cache');
      next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(flash());
    app.use('/', routes);

    app.get('/Userevents', function (req, res) {
      res.render('Userevents'); // Assuming 'events.ejs' is located in the views directory
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });

  })
  .catch((err) =>
    console.error('MongoDb connection error:', err)
  );
