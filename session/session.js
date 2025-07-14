const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const sessionMiddleware = session({
    secret: 'kong',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 10 }),
    cookie: { maxAge: 1000 * 60 * 10 }
});
module.exports = sessionMiddleware;