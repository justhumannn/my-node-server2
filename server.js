const bodyParser = require('body-parser');
const express = require('express');
const nunjucks = require('nunjucks');

const todoRouter = require('./route/todo/todo.js');
const loginRouter = require('./route/login/login.js');
const registerRouter = require('./route/register/register.js');
const boardRouter = require('./route/board/board.js');
const voteRouter = require('./route/vote/vote.js');
const commentRouter = require('./route/comment/comment.js');

const app = express();
const sessionMiddleware = require('./session/session.js');

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app
}).addFilter('nl2br', str => {
  if (!str) return '';
  return str.replace(/\n/g, '<br>');
});
app.use('/', todoRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', boardRouter);
app.use('/', voteRouter);
app.use('/', commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});