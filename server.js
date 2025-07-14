const bodyParser = require('body-parser');
const express = require('express');
const nunjucks = require('nunjucks');
const http = require('http');
const { Server } = require('socket.io');

const todoRouter = require('./route/todo/todo.js');
const loginRouter = require('./route/login/login.js');
const registerRouter = require('./route/register/register.js');
const boardRouter = require('./route/board/board.js');
const setupSocket = require('./socket/socket.js');
const chatRouter = require('./route/chat/chat.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const sessionMiddleware = require('./session/session.js');

app.use(sessionMiddleware);

// 📌 바디파서, 정적파일, 뷰 엔진 설정
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

// 📌 라우터 등록
app.use('/', todoRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', boardRouter);
app.use('/',chatRouter);

// 📌 Socket.IO 핸들러 등록
setupSocket(io);

// 📌 서버 실행
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
