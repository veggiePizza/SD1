const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');  // Import csurf
const stripeRoutes = require('./routes/Stripe/stripe');  // Import Stripe routes

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    // Enable CORS only in development
    app.use(cors());
}

// Helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);


// Re-enable CSRF middleware
// app.use(
//     csurf({
//         cookie: {
//             secure: isProduction,
//             sameSite: isProduction ? "Lax" : "Strict",
//             httpOnly: true,
//         }
//     })
// );

// Use the Stripe routes (this would be the route to handle payment-related operations)
 app.use('/stripe', stripeRoutes);  // Add '/stripe' prefix to all Stripe routes

const routes = require('./routes');
app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

const { ValidationError } = require('sequelize');

app.use((err, _req, _res, next) => {
    // Check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;
