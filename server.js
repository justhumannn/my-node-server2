const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')
const app = express();
const nunjucks = require('nunjucks');
const MemoryStore = require('memorystore')(session);
const todoRouter = require('./route/todo/todo.js')
const loginRouter = require('./route/login/login.js')
const registerRouter = require('./route/register/register.js')
const boardRouter = require('./route/board/board.js')
const sessionObj = {
  secret: 'kong',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: 1000 * 60 * 10 }),
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
};

app.set('view engine','html');
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

nunjucksEnv.addFilter('nl2br', function (str) {
  if (!str) return '';
  return str.replace(/\n/g, '<br>');
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/',todoRouter)
app.use('/',loginRouter)
app.use('/',registerRouter)
app.use('/',boardRouter)
app.use(session(sessionObj));

app.listen(8000, (req,res) => {
    console.log('http://localhost:8000')
})