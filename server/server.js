const express = require('express');
const config = require('config');

const app = express();

if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config.js');
    const compiler = webpack({ ...webpackConfig, mode: 'development' });
    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static('dist'));
}

app.listen(process.env.PORT || 3000);
