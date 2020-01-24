const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const v1Routes = require('../api/v1/index');

/**
* Express instance
* @public
*/
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());

app.use('/v1', v1Routes);

module.exports = app;