var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // home
var usersRouter = require('./routes/users');

var app = express();

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
/**
 * condition
 * email: 1. 확인용과 일치여부 판단 2. @com과 같은 형식 판단 3. 데이터베이스에 동일한 email 있으면 이미 회원가입되었다고 한다.
 * pw: 1. 확인용과 일치여부 판단 2. 특수문자, 숫자, 영문자 조합 인정 각각 최소 한개씩 필수 3. 최소 6자 ~ 18자까지 인정
 * phone_number: 1. '-' 단위로 입력하도록 한다.
 * name: 한글자 3~4 있는대로 받는다. -> 추후 수정가능 
 */


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
