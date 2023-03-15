var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // home
var usersRouter = require('./routes/users');

var app = express();
const sign_up = require('./routes/api/member/sign_up');

// view engine setup -> template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Sign Up (input: email, email(check), pw, pw(check), phone_number, name)

app.post('/API/Sign_up', (req, res) => {
  console.log("[Call Sign up API]");

  const userEmail = req.body.email;
  const userEmailCheck = req.body.emailCheck;
  const userPw = req.body.pw;
  const userPwCheck = req.body.pwCheck;
  const userPhone_number = req.body.phone_number;
  const userName = req.body.name;

  sign_up.verification(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName, (error, {}) => {
    if(error){
      console.log('error')
      return res.send({error})
    }
    res.json({status: res.statusCode});
  });

  
})

// Log in | Sign in(input: email, pw) 
/**
 * database 여부 파악하고 등록해주면 된다.
 */

// search PW (input: email)
/**
 * email 받고 해당하는 임시비밀번호를 보여주고 데이터베이스도 임시비밀번호로 바꾼다. (임시비밀번호는 난수 생성프로그램으로 보여주면 될거 같다.) 
 * email로 임시비밀번호를 보내주는 것으로 하면, 단지 웹 상에서 보여주는 것보다 보안성이 크다.
 * (추가 고려)추가로 시간이 생긴다면, 이메일로 인증하는 과정을 거쳐 2번 인증하는 수단도 고려해보면 보완성이 클 것이다.
 */

// edit account(input: pw, phone_number, name)
/**
 * condition
 * pw: 기존 비밀번호가 맞는지 확인하고. 2. 새로운 비밀번호는 회원가입 규칙에 의거하여 입력받는다.
 * phone_number, name도 회원가입 규칙에 의거하여 수정된 것을 받는다.
 */


// session 도입하여 삭제.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
